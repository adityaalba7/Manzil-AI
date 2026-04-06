import { Router } from 'express';
import { body } from 'express-validator';
import authMiddleware from '../middleware/auth.js';
import {
  startSession,
  submitAnswer,
  endSession,
  listSessions,
  getSessionDetail,
  getPerformance,
  getFillerStats,
  transcribeAudio,
  salaryRoleplay,
} from '../controllers/interview.controller.js';

const router = Router();

router.use(authMiddleware);

const VALID_DOMAINS = ['cs', 'marketing', 'finance', 'hr', 'product', 'data'];
const VALID_ROUND_TYPES = ['hr', 'technical', 'mixed'];

const startSessionRules = [
  body('domain')
    .notEmpty().withMessage('domain is required.')
    .isIn(VALID_DOMAINS).withMessage(`domain must be one of: ${VALID_DOMAINS.join(', ')}.`),
  body('round_type')
    .notEmpty().withMessage('round_type is required.')
    .isIn(VALID_ROUND_TYPES).withMessage(`round_type must be one of: ${VALID_ROUND_TYPES.join(', ')}.`),
  body('company_target')
    .optional().trim().isLength({ max: 100 }).withMessage('company_target must be at most 100 characters.'),
  body('total_questions')
    .optional().isInt({ min: 1, max: 20 }).withMessage('total_questions must be between 1 and 20.'),
];

const submitAnswerRules = [
  body('answer_text').notEmpty().withMessage('answer_text is required.'),
  body('question_text').notEmpty().withMessage('question_text is required.'),
  body('question_index')
    .notEmpty().withMessage('question_index is required.')
    .isInt({ min: 0 }).withMessage('question_index must be a non-negative integer.'),
  body('audio_s3_key').optional().isString(),
];

const salaryRules = [
  body('message').notEmpty().withMessage('message is required.'),
];

router.post('/sessions',                startSessionRules,  startSession);
router.post('/sessions/:id/answer',     submitAnswerRules,  submitAnswer);
router.post('/sessions/:id/end',                            endSession);
router.get('/sessions',                                     listSessions);
router.get('/sessions/:id',                                 getSessionDetail);
router.get('/performance',                                  getPerformance);
router.get('/filler-stats',                                 getFillerStats);
router.post('/voice/transcribe',                            transcribeAudio);
router.post('/salary-roleplay/message', salaryRules,        salaryRoleplay);

export default router;
