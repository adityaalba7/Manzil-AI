import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { query } from '../db/index.js';
import redisClient from '../db/redis.js';
import { sendSuccess, sendError } from '../utils/response.js';

const SALT_ROUNDS = 12;

const generateTokenPair = (user) => {
  const payload = { id: user.id, email: user.email, name: user.name };

  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
  });

  return { accessToken, refreshToken };
};

const storeRefreshToken = async (userId, refreshToken) => {
  const TTL_SECONDS = 30 * 24 * 60 * 60;
  await redisClient.setEx(`refresh:${userId}`, TTL_SECONDS, refreshToken);
};

const checkValidation = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const first = errors.array()[0];
    sendError(res, 'VALIDATION_ERROR', first.msg, 422);
    return false;
  }
  return true;
};

const PUBLIC_USER_FIELDS = 'id, name, email, college, monthly_budget, language_pref, trimind_score, streak_days, exam_date, onboarding_goal, created_at, last_active_at';

export const register = async (req, res) => {
  if (!checkValidation(req, res)) return;

  const { name, email, password, college } = req.body;

  const existing = await query('SELECT id FROM users WHERE email = $1', [email.toLowerCase().trim()]);
  if (existing.rowCount > 0) {
    return sendError(res, 'EMAIL_TAKEN', 'An account with this email already exists.', 409);
  }

  const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

  const { rows } = await query(
    `INSERT INTO users (name, email, password_hash, college)
     VALUES ($1, $2, $3, $4)
     RETURNING ${PUBLIC_USER_FIELDS}`,
    [name.trim(), email.toLowerCase().trim(), password_hash, college?.trim() || null]
  );

  const user = rows[0];
  const { accessToken, refreshToken } = generateTokenPair(user);
  await storeRefreshToken(user.id, refreshToken);

  await query('UPDATE users SET last_active_at = NOW() WHERE id = $1', [user.id]);

  return sendSuccess(
    res,
    { user, access_token: accessToken, refresh_token: refreshToken },
    {},
    201
  );
};

export const login = async (req, res) => {
  if (!checkValidation(req, res)) return;

  const { email, password } = req.body;

  const { rows } = await query(
    `SELECT *, ${PUBLIC_USER_FIELDS.split(', ').map(f => f).join(', ')} FROM users WHERE email = $1`,
    [email.toLowerCase().trim()]
  );

  if (rows.length === 0) {
    return sendError(res, 'INVALID_CREDENTIALS', 'Invalid email or password.', 401);
  }

  const userRow = rows[0];

  if (!userRow.password_hash) {
    return sendError(res, 'NO_PASSWORD', 'This account does not use password login.', 400);
  }

  const isMatch = await bcrypt.compare(password, userRow.password_hash);
  if (!isMatch) {
    return sendError(res, 'INVALID_CREDENTIALS', 'Invalid email or password.', 401);
  }

  const { accessToken, refreshToken } = generateTokenPair(userRow);
  await storeRefreshToken(userRow.id, refreshToken);

  await query('UPDATE users SET last_active_at = NOW() WHERE id = $1', [userRow.id]);

  const { password_hash, ...safeUser } = userRow;

  return sendSuccess(res, {
    user: safeUser,
    access_token: accessToken,
    refresh_token: refreshToken,
  });
};

export const refresh = async (req, res) => {
  const { refresh_token } = req.body;

  if (!refresh_token) {
    return sendError(res, 'MISSING_TOKEN', 'refresh_token is required.', 400);
  }

  let decoded;
  try {
    decoded = jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET);
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return sendError(res, 'TOKEN_EXPIRED', 'Refresh token has expired. Please log in again.', 401);
    }
    return sendError(res, 'INVALID_TOKEN', 'Refresh token is invalid.', 401);
  }

  const storedToken = await redisClient.get(`refresh:${decoded.id}`);
  if (!storedToken || storedToken !== refresh_token) {
    return sendError(res, 'TOKEN_REUSED', 'Refresh token is invalid or has already been used.', 401);
  }

  const { rows } = await query(
    `SELECT ${PUBLIC_USER_FIELDS} FROM users WHERE id = $1`,
    [decoded.id]
  );

  if (rows.length === 0) {
    return sendError(res, 'USER_NOT_FOUND', 'User no longer exists.', 404);
  }

  const user = rows[0];

  await redisClient.del(`refresh:${user.id}`);
  const { accessToken, refreshToken: newRefreshToken } = generateTokenPair(user);
  await storeRefreshToken(user.id, newRefreshToken);

  return sendSuccess(res, {
    access_token: accessToken,
    refresh_token: newRefreshToken,
  });
};

export const logout = async (req, res) => {
  const userId = req.user?.id;

  if (userId) {
    await redisClient.del(`refresh:${userId}`);
  }

  return sendSuccess(res, { message: 'Logged out successfully.' });
};

export const getMe = async (req, res) => {
  const { rows } = await query(
    `SELECT ${PUBLIC_USER_FIELDS} FROM users WHERE id = $1`,
    [req.user.id]
  );

  if (rows.length === 0) {
    return sendError(res, 'USER_NOT_FOUND', 'User not found.', 404);
  }

  return sendSuccess(res, { user: rows[0] });
};

export const updateMe = async (req, res) => {
  if (!checkValidation(req, res)) return;

  const ALLOWED = ['name', 'college', 'language_pref', 'monthly_budget'];
  const updates = {};

  for (const key of ALLOWED) {
    if (req.body[key] !== undefined) {
      updates[key] = req.body[key];
    }
  }

  if (Object.keys(updates).length === 0) {
    return sendError(res, 'NO_FIELDS', 'No updatable fields were provided.', 400);
  }

  const setClauses = Object.keys(updates).map((key, i) => `${key} = $${i + 1}`);
  const values = Object.values(updates);
  values.push(req.user.id);

  const { rows } = await query(
    `UPDATE users SET ${setClauses.join(', ')}, last_active_at = NOW()
     WHERE id = $${values.length}
     RETURNING ${PUBLIC_USER_FIELDS}`,
    values
  );

  return sendSuccess(res, { user: rows[0] });
};

export const onboarding = async (req, res) => {
  if (!checkValidation(req, res)) return;

  const { exam_date, monthly_budget, onboarding_goal, language_pref } = req.body;

  const { rows } = await query(
    `UPDATE users
     SET
       exam_date        = COALESCE($1, exam_date),
       monthly_budget   = COALESCE($2, monthly_budget),
       onboarding_goal  = COALESCE($3, onboarding_goal),
       language_pref    = COALESCE($4, language_pref),
       last_active_at   = NOW()
     WHERE id = $5
     RETURNING ${PUBLIC_USER_FIELDS}`,
    [
      exam_date       || null,
      monthly_budget  || null,
      onboarding_goal || null,
      language_pref   || null,
      req.user.id,
    ]
  );

  if (rows.length === 0) {
    return sendError(res, 'USER_NOT_FOUND', 'User not found.', 404);
  }

  return sendSuccess(res, { user: rows[0] });
};
