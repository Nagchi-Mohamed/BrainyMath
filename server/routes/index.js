import express from 'express';
import authRoutes from './auth.js';
import lessonRoutes from './lessonRoutes.js';
import userProgressRoutes from './userProgress.js';

const router = express.Router();

router.use('/users', authRoutes);
router.use('/lessons', lessonRoutes);
router.use('/progress', userProgressRoutes);

export default router;
