import { sendError } from '../utils/response.js';

const errorHandler = (err, req, res, next) => {
  console.error('🔥 Unhandled error:', err);

  if (err.code === '23505') {
    return sendError(res, 'DUPLICATE_ENTRY', 'A record with that value already exists.', 409);
  }

  if (err.type === 'VALIDATION_ERROR') {
    return sendError(res, 'VALIDATION_ERROR', err.message, 422);
  }

  if (err.name === 'JsonWebTokenError') {
    return sendError(res, 'INVALID_TOKEN', 'Access token is invalid.', 401);
  }

  const status = err.status || err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production'
    ? 'An unexpected error occurred.'
    : err.message || 'An unexpected error occurred.';

  return sendError(res, 'INTERNAL_ERROR', message, status);
};

export default errorHandler;
