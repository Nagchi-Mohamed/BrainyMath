import asyncHandler from 'express-async-handler';
import Game from '../models/gameModel.js';

// @desc    Get all games for a user
// @route   GET /api/games
// @access  Private
const getGames = asyncHandler(async (req, res) => {
  const games = await Game.find({ user: req.user._id })
    .populate('user', 'name email')
    .sort({ createdAt: -1 });
  
  res.json(games);
});

// @desc    Get user's game history with filtering
// @route   GET /api/games/history
// @access  Private
const getGameHistory = asyncHandler(async (req, res) => {
  const { filter, timeRange } = req.query;
  
  let query = { user: req.user._id };
  
  // Apply game type filter
  if (filter && filter !== 'all') {
    query.gameType = filter.toUpperCase();
  }
  
  // Apply time range filter
  if (timeRange && timeRange !== 'all') {
    const now = new Date();
    let startDate;
    
    switch (timeRange) {
      case 'week':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate = new Date(now);
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        startDate = new Date(now);
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        break;
    }
    
    if (startDate) {
      query.createdAt = { $gte: startDate };
    }
  }
  
  const games = await Game.find(query)
    .sort({ createdAt: -1 })
    .lean();
  
  // Calculate statistics
  let stats = {
    totalGames: games.length,
    averageScore: 0,
    highestScore: 0,
    totalTimePlayed: 0,
    gamesByType: {}
  };
  
  if (games.length > 0) {
    stats.averageScore = Math.round(
      games.reduce((acc, game) => acc + game.score, 0) / games.length
    );
    stats.highestScore = Math.max(...games.map(game => game.score));
    stats.totalTimePlayed = games.reduce((acc, game) => acc + game.timeSpent, 0);
    
    // Count games by type
    games.forEach(game => {
      const type = game.gameType;
      if (!stats.gamesByType[type]) {
        stats.gamesByType[type] = 0;
      }
      stats.gamesByType[type]++;
    });
  }
  
  res.json({
    games,
    stats
  });
});

// @desc    Create a new game
// @route   POST /api/games
// @access  Private
export const createGame = asyncHandler(async (req, res) => {
  const { score, timeSpent, mistakes, gameType } = req.body;

  const game = await Game.create({
    user: req.user._id,
    score,
    timeSpent,
    mistakes,
    gameType
  });

  if (game) {
    res.status(201).json(game);
  } else {
    res.status(400);
    throw new Error('Invalid game data');
  }
});

// @desc    Get game by ID
// @route   GET /api/games/:id
// @access  Public
export const getGameById = asyncHandler(async (req, res) => {
  const game = await Game.findById(req.params.id).populate('user', 'name');

  if (game) {
    res.json(game);
  } else {
    res.status(404);
    throw new Error('Game not found');
  }
});

export {
  getGames,
  createGame,
  getGameById,
  getGameHistory
}; 