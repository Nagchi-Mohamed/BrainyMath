import express from 'express';
import { body } from 'express-validator';
import {
  getCategories,
  createCategory,
  getThreadsByCategory,
  createThread,
  getPostsByThread,
  createPost,
  updateThread,
  deleteThread,
  updatePost,
  deletePost,
} from '../controllers/forumController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Forum Categories
router.route('/categories')
  .get(getCategories) // Public
  .post(protect, admin, createCategory); // Admin only

// Threads by Category
router.route('/categories/:categoryId/threads')
  .get(getThreadsByCategory) // Public
  .post(
    protect, // Authenticated users only
    [
      body('title').notEmpty().withMessage('Title is required'),
      body('content').notEmpty().withMessage('Content is required'),
    ],
    createThread
  );

// Posts by Thread
router.route('/threads/:threadId/posts')
  .get(getPostsByThread) // Public
  .post(
    protect, // Authenticated users only
    [
      body('content').notEmpty().withMessage('Content is required'),
    ],
    createPost
  );

router.route('/threads/:threadId')
  .put(protect, updateThread) // Update a thread
  .delete(protect, admin, deleteThread); // Delete a thread (Admin only)

router.route('/posts/:postId')
  .put(protect, updatePost) // Update a post
  .delete(protect, deletePost); // Delete a post

export default router;
