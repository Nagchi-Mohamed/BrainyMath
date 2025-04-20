// backend/routes/lessonRoutes.js
import express from 'express';
import { body } from 'express-validator';
import {
  getLessons,
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson,
} from '../controllers/lessonController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getLessons);
router.get('/:id', getLessonById);

// Admin protected routes
router.post(
  '/',
  protect,
  admin,
  [
    body('title', 'Title is required').notEmpty(),
    body('description', 'Description is required').notEmpty(),
    body('content', 'Content is required').notEmpty(),
    body('category', 'Category is required').notEmpty(),
    body('difficulty', 'Difficulty is required').notEmpty(),
  ],
  createLesson
);

router.put(
  '/:id',
  protect,
  admin,
  [
    body('title').optional().notEmpty(),
    body('description').optional().notEmpty(),
    body('content').optional().notEmpty(),
    body('category').optional().notEmpty(),
    body('difficulty').optional().notEmpty(),
  ],
  updateLesson
);

router.delete('/:id', protect, admin, deleteLesson);

export default router;
