import express from 'express';
import { body } from 'express-validator';
import {
  getCategories,
  getThreadsByCategory,
  getPostsByThread,
  createThread,
  createPost,
} from '../controllers/forumController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all categories
router.get('/categories', getCategories);

// Get threads in a category with pagination
router.get('/categories/:categoryId/threads', getThreadsByCategory);

// Get posts in a thread with pagination
router.get('/threads/:threadId/posts', getPostsByThread);

// Create a new thread in a category (protected)
router.post(
  '/categories/:categoryId/threads',
  protect,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
  ],
  createThread
);

// Create a new post in a thread (protected)
router.post(
  '/threads/:threadId/posts',
  protect,
  [body('content').notEmpty().withMessage('Content is required')],
  createPost
);

export default router;
