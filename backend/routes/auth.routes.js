import { Router } from 'express';
import { body } from 'express-validator';
import authMiddleware from '../middleware/auth.js';
import {
  register,
  login,
  refresh,
  logout,
  getMe,
  updateMe,
  onboarding,
} from '../controllers/auth.controller.js';

const router = Router();

const registerRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required.')
    .isLength({ max: 100 }).withMessage('Name must be at most 100 characters.'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Must be a valid email address.'),
  body('password')
    .notEmpty().withMessage('Password is required.')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters.'),
  body('college')
    .optional()
    .trim()
    .isLength({ max: 200 }).withMessage('College name must be at most 200 characters.'),
];

const loginRules = [
  body('email').trim().notEmpty().isEmail().withMessage('Valid email is required.'),
  body('password').notEmpty().withMessage('Password is required.'),
];

const updateMeRules = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 }).withMessage('Name must be between 1 and 100 characters.'),
  body('college')
    .optional()
    .trim()
    .isLength({ max: 200 }).withMessage('College must be at most 200 characters.'),
  body('language_pref')
    .optional()
    .isIn(['english', 'hindi', 'tamil', 'telugu', 'bengali', 'marathi', 'gujarati'])
    .withMessage('Unsupported language preference.'),
  body('monthly_budget')
    .optional()
    .isInt({ min: 0 }).withMessage('monthly_budget must be a non-negative integer (paise).'),
];

const onboardingRules = [
  body('exam_date')
    .optional()
    .isISO8601().withMessage('exam_date must be a valid ISO 8601 date (YYYY-MM-DD).'),
  body('monthly_budget')
    .optional()
    .isInt({ min: 0 }).withMessage('monthly_budget must be a non-negative integer (paise).'),
  body('onboarding_goal')
    .optional()
    .isLength({ max: 50 }).withMessage('onboarding_goal must be at most 50 characters.'),
  body('language_pref')
    .optional()
    .isIn(['english', 'hindi', 'tamil', 'telugu', 'bengali', 'marathi', 'gujarati'])
    .withMessage('Unsupported language preference.'),
];

router.post('/register',    registerRules,   register);
router.post('/login',       loginRules,      login);
router.post('/refresh',                      refresh);
router.post('/logout',      authMiddleware,  logout);
router.get('/me',           authMiddleware,  getMe);
router.patch('/me',         authMiddleware,  updateMeRules, updateMe);
router.post('/onboarding',  authMiddleware,  onboardingRules, onboarding);

export default router;
