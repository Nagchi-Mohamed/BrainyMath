import express from 'express';
import { body } from 'express-validator';
import {
  getAllQuizzes,
  getQuizById,
  getQuizQuestions,
  createQuiz,
  addQuestionToQuiz,
  submitQuiz,
  updateQuiz,
  deleteQuiz,
} from '../controllers/quizController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { validateRequest, validateObjectId } from '../middleware/validationMiddleware.js';

const router = express.Router();

// Get all quizzes
router.route('/').get(getAllQuizzes);

// Create a new quiz (Admin only)
router.route('/').post(
  protect,
  admin,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('difficulty').isIn(['Beginner', 'Intermediate', 'Advanced']).withMessage('Invalid difficulty level'),
  ],
  validateRequest,
  createQuiz
);

// Get quiz by ID
router.route('/:quizId').get(validateObjectId('quizId'), getQuizById);

// Update a quiz
router.route('/:quizId').put(protect, admin, validateObjectId('quizId'), updateQuiz);

// Delete a quiz
router.route('/:quizId').delete(protect, admin, validateObjectId('quizId'), deleteQuiz);

// Get questions for a specific quiz
router.route('/:quizId/questions').get(validateObjectId('quizId'), getQuizQuestions);

// Add a question to a quiz (Admin only)
router.route('/:quizId/questions').post(
  protect,
  admin,
  validateObjectId('quizId'),
  [
    body('text').notEmpty().withMessage('Question text is required'),
    body('options').isArray({ min: 2 }).withMessage('Options must be an array with at least two items'),
    body('correctAnswerIndex').isInt({ min: 0 }).withMessage('Correct answer index must be a non-negative integer'),
  ],
  validateRequest,
  addQuestionToQuiz
);

// Submit quiz answers
router.post(
  '/:quizId/submit',
  protect,
  validateObjectId('quizId'),
  [
    body('answers').isArray().withMessage('Answers must be an array'),
    body('answers.*').isInt({ min: 0 }).withMessage('Each answer must be a non-negative integer'),
  ],
  validateRequest,
  submitQuiz
);

export default router;