import { validationResult } from 'express-validator';
import mongoose from 'mongoose';

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateObjectId = (paramName = 'id') => (req, res, next) => {
  const id = req.params[paramName];
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: `Invalid ID format for parameter: ${paramName}` });
  }
  next();
};

export const validateGameInput = (req, res, next) => {
  const { score, timeSpent, mistakes, gameType } = req.body;
  
  if (typeof score !== 'number' || score < 0) {
    return res.status(400).json({ message: 'Score must be a non-negative number' });
  }
  
  if (typeof timeSpent !== 'number' || timeSpent < 0) {
    return res.status(400).json({ message: 'Time spent must be a non-negative number' });
  }
  
  if (typeof mistakes !== 'number' || mistakes < 0) {
    return res.status(400).json({ message: 'Mistakes must be a non-negative number' });
  }

  const validGameTypes = ['addition', 'subtraction', 'multiplication', 'division'];
  if (!gameType || !validGameTypes.includes(gameType.toLowerCase())) {
    return res.status(400).json({ message: 'Invalid game type' });
  }
  
  next();
};
