import express from 'express';
import * as userProgressController from '../controllers/userProgressController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(auth);

// Get all progress for the current user
router.get('/', userProgressController.getUserProgress);

// Get progress for a specific lesson
router.get('/lesson/:lessonId', userProgressController.getLessonProgress);

// Update progress for a lesson
router.post('/update', userProgressController.updateProgress);

// Get overall progress statistics
router.get('/stats', userProgressController.getProgressStats);

export default router;
