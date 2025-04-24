import express from 'express';
import { body } from 'express-validator';
import { recordProgress, getUserProgress } from '../controllers/userProgressController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /api/user-progress
// @desc    Record or update user progress
// @access  Private
router.post(
  '/',
  protect,
  [
    body('itemId').notEmpty().withMessage('Item ID is required'),
    body('itemType').isIn(['Lesson', 'Quiz', 'Game']).withMessage('Invalid item type'),
    body('status').isIn(['Completed', 'Started', 'Passed', 'Failed']).withMessage('Invalid status'),
  ],
  recordProgress
);

// @route   GET /api/user-progress/me
// @desc    Get user progress
// @access  Private
router.get('/me', protect, getUserProgress);

export default router;