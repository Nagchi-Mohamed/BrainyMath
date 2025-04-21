import express from 'express';
import { listQuizzes, getQuizDetails, submitQuizResults } from '../controllers/quizController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// List all quizzes
router.get('/quizzes', listQuizzes);

// Get quiz details including questions
router.get('/quizzes/:quizId', getQuizDetails);

// Submit quiz results
router.post('/quizzes/:quizId/submit', protect, submitQuizResults);

export default router;
