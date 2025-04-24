// backend/routes/authRoutes.js
import express from 'express';
import { body } from 'express-validator';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
} from '../controllers/authController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Register user
router.post(
  '/register',
  [
    body('name', 'Name is required').notEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  ],
  registerUser
);

// Login user
router.post(
  '/login',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists(),
  ],
  loginUser
);

// Get user profile
router.get('/profile', protect, getUserProfile);

// Update user profile
router.put(
  '/profile',
  protect,
  [
    body('name', 'Name is required').optional().notEmpty(),
    body('email', 'Please include a valid email').optional().isEmail(),
    body('password', 'Password must be at least 6 characters').optional().isLength({ min: 6 }),
  ],
  updateUserProfile
);

// Admin routes
router.get('/users', protect, admin, getUsers);
router.delete('/users/:id', protect, admin, deleteUser);

export default router;
