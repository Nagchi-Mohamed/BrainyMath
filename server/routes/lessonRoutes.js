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
    body('title', 'Lesson title is required').trim().not().isEmpty(),
    body('description', 'Description is required').trim().not().isEmpty(),
    body('content', 'Content is required').not().isEmpty(),
    body('category', 'Category is required').isIn(['Algebra', 'Geometry', 'Calculus', 'Statistics', 'General']),
    body('difficulty', 'Difficulty is required').isIn(['Beginner', 'Intermediate', 'Advanced']),
  ],
  createLesson
);

router.put(
  '/:id',
  protect,
  admin,
  [
    body('title').optional().trim().not().isEmpty(),
    body('description').optional().trim().not().isEmpty(),
    body('content').optional().not().isEmpty(),
    body('category').optional().isIn(['Algebra', 'Geometry', 'Calculus', 'Statistics', 'General']),
    body('difficulty').optional().isIn(['Beginner', 'Intermediate', 'Advanced']),
  ],
  updateLesson
);

router.delete('/:id', protect, admin, deleteLesson);

export default router;
