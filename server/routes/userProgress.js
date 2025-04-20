const express = require('express');
const router = express.Router();
const userProgressController = require('../controllers/userProgressController');
const auth = require('../middleware/auth');

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
