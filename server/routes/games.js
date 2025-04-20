const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const auth = require('../middleware/auth');

// File-based data access functions
const readData = (filename) => {
  const filePath = path.join(__dirname, '..', 'data', filename);
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return null;
  }
};

const writeData = (filename, data) => {
  const filePath = path.join(__dirname, '..', 'data', filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    return false;
  }
};

// Game validation middleware
const validateGame = (game) => {
  const errors = [];
  
  if (!game.title || game.title.trim().length < 5) {
    errors.push('Title must be at least 5 characters long');
  }
  
  if (!game.description || game.description.trim().length < 20) {
    errors.push('Description must be at least 20 characters long');
  }
  
  if (!['beginner', 'intermediate', 'advanced'].includes(game.level)) {
    errors.push('Invalid game level');
  }
  
  if (!game.category || !['algebra', 'geometry', 'calculus', 'statistics'].includes(game.category)) {
    errors.push('Invalid game category');
  }
  
  if (!game.type || !['quiz', 'puzzle', 'challenge'].includes(game.type)) {
    errors.push('Invalid game type');
  }
  
  if (!game.points || game.points < 0 || game.points > 1000) {
    errors.push('Points must be between 0 and 1000');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Get all games
router.get('/', (req, res) => {
  try {
    const games = readData('games.json') || [];
    res.json(games);
  } catch (error) {
    console.error('Get games error:', error);
    res.status(500).json({ 
      error: 'SERVER_ERROR',
      message: 'Error retrieving games' 
    });
  }
});

// Get game by ID
router.get('/:id', (req, res) => {
  try {
    const games = readData('games.json') || [];
    const game = games.find(game => game.id === req.params.id);
    
    if (!game) {
      return res.status(404).json({ 
        error: 'NOT_FOUND',
        message: 'Game not found' 
      });
    }
    
    res.json(game);
  } catch (error) {
    console.error('Get game error:', error);
    res.status(500).json({ 
      error: 'SERVER_ERROR',
      message: 'Error retrieving game' 
    });
  }
});

// Create new game
router.post('/', auth, (req, res) => {
  try {
    const { title, description, level, category, type, points, content } = req.body;
    
    // Validate input
    if (!title || !description || !level || !category || !type || !points || !content) {
      return res.status(400).json({ 
        error: 'VALIDATION_ERROR',
        message: 'All fields are required' 
      });
    }
    
    // Validate game data
    const gameData = { title, description, level, category, type, points };
    const validation = validateGame(gameData);
    if (!validation.isValid) {
      return res.status(400).json({ 
        error: 'VALIDATION_ERROR',
        message: 'Invalid game data',
        details: validation.errors 
      });
    }
    
    const games = readData('games.json');
    const newGame = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      level,
      category,
      type,
      points: parseInt(points),
      content,
      createdAt: new Date().toISOString(),
      createdBy: req.user.id,
      status: 'active',
      plays: 0,
      averageScore: 0
    };
    
    games.push(newGame);
    if (!writeData('games.json', games)) {
      throw new Error('Failed to save game data');
    }
    
    res.status(201).json(newGame);
  } catch (error) {
    console.error('Create game error:', error);
    res.status(500).json({ 
      error: 'SERVER_ERROR',
      message: 'Error creating game' 
    });
  }
});

// Update game
router.put('/:id', auth, (req, res) => {
  try {
    const { title, description, level, category, type, points, content } = req.body;
    const games = readData('games.json');
    const gameIndex = games.findIndex(game => game.id === req.params.id);
    
    if (gameIndex === -1) {
      return res.status(404).json({ 
        error: 'NOT_FOUND',
        message: 'Game not found' 
      });
    }
    
    // Check if user is authorized (teacher or admin)
    if (req.user.role !== 'teacher' && req.user.role !== 'admin') {
      return res.status(403).json({ 
        error: 'FORBIDDEN',
        message: 'Not authorized to update games' 
      });
    }
    
    // Validate game data if provided
    if (title || description || level || category || type || points) {
      const gameData = {
        title: title || games[gameIndex].title,
        description: description || games[gameIndex].description,
        level: level || games[gameIndex].level,
        category: category || games[gameIndex].category,
        type: type || games[gameIndex].type,
        points: points || games[gameIndex].points
      };
      
      const validation = validateGame(gameData);
      if (!validation.isValid) {
        return res.status(400).json({ 
          error: 'VALIDATION_ERROR',
          message: 'Invalid game data',
          details: validation.errors 
        });
      }
    }
    
    const updatedGame = {
      ...games[gameIndex],
      title: title ? title.trim() : games[gameIndex].title,
      description: description ? description.trim() : games[gameIndex].description,
      level: level || games[gameIndex].level,
      category: category || games[gameIndex].category,
      type: type || games[gameIndex].type,
      points: points ? parseInt(points) : games[gameIndex].points,
      content: content || games[gameIndex].content,
      updatedAt: new Date().toISOString(),
      updatedBy: req.user.id
    };
    
    games[gameIndex] = updatedGame;
    if (!writeData('games.json', games)) {
      throw new Error('Failed to update game data');
    }
    
    res.json(updatedGame);
  } catch (error) {
    console.error('Update game error:', error);
    res.status(500).json({ 
      error: 'SERVER_ERROR',
      message: 'Error updating game' 
    });
  }
});

// Submit game score
router.post('/:id/score', auth, (req, res) => {
  try {
    const { score, timeSpent } = req.body;
    const games = readData('games.json');
    const gameIndex = games.findIndex(game => game.id === req.params.id);
    
    if (gameIndex === -1) {
      return res.status(404).json({ 
        error: 'NOT_FOUND',
        message: 'Game not found' 
      });
    }
    
    // Validate score data
    if (!score || score < 0 || score > 100) {
      return res.status(400).json({ 
        error: 'VALIDATION_ERROR',
        message: 'Score must be between 0 and 100' 
      });
    }
    
    if (!timeSpent || timeSpent < 0) {
      return res.status(400).json({ 
        error: 'VALIDATION_ERROR',
        message: 'Invalid time spent' 
      });
    }
    
    const game = games[gameIndex];
    const pointsEarned = Math.floor((score / 100) * game.points);
    
    // Update game stats
    game.plays += 1;
    game.averageScore = ((game.averageScore * (game.plays - 1)) + score) / game.plays;
    
    // Update user stats
    const users = readData('users.json');
    const userIndex = users.findIndex(user => user.id === req.user.id);
    
    if (userIndex !== -1) {
      const user = users[userIndex];
      user.points = (user.points || 0) + pointsEarned;
      user.gamesPlayed = (user.gamesPlayed || 0) + 1;
      
      // Add game history
      user.gameHistory = user.gameHistory || [];
      user.gameHistory.push({
        gameId: game.id,
        score,
        pointsEarned,
        timeSpent,
        playedAt: new Date().toISOString()
      });
      
      if (!writeData('users.json', users)) {
        throw new Error('Failed to update user data');
      }
    }
    
    if (!writeData('games.json', games)) {
      throw new Error('Failed to update game data');
    }
    
    res.json({
      pointsEarned,
      newTotal: users[userIndex].points,
      gameStats: {
        plays: game.plays,
        averageScore: game.averageScore
      }
    });
  } catch (error) {
    console.error('Submit score error:', error);
    res.status(500).json({ 
      error: 'SERVER_ERROR',
      message: 'Error submitting score' 
    });
  }
});

module.exports = router; 