import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getGames, createGame, getGameById, getGameHistory } from '../controllers/gameController.js';
import { validateGameInput, validateObjectId } from '../middleware/validationMiddleware.js';

const router = express.Router();

// @route   GET /api/games
// @desc    Get all games
// @access  Private
router.route('/')
  .get(protect, getGames)
  .post(protect, validateGameInput, createGame);

// @route   GET /api/games/history
// @desc    Get game history
// @access  Private
router.route('/history')
  .get(protect, getGameHistory);

// @route   GET /api/games/:id
// @desc    Get game by ID
// @access  Private
router.route('/:id')
  .get(protect, validateObjectId, getGameById);

export default router; 