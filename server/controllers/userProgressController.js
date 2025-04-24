import { validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler';
import UserProgress from '../models/userProgressModel.js';

// @desc    Record or update user progress
// @route   POST /api/progress
// @access  Private
const recordProgress = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { itemId, itemType, status, score, possibleScore } = req.body;
  const userId = req.user._id;

  try {
    const updatedProgress = await UserProgress.findOneAndUpdate(
      { user: userId, item: itemId, itemType },
      {
        $set: {
          status,
          score: score !== undefined ? score : undefined,
          possibleScore: possibleScore !== undefined ? possibleScore : undefined,
          completedAt: ['Completed', 'Passed', 'Failed'].includes(status) ? new Date() : undefined,
        },
      },
      { new: true, upsert: true }
    );

    res.status(200).json(updatedProgress);
  } catch (error) {
    res.status(500).json({ message: 'Failed to record progress' });
  }
});

// @desc    Get user progress
// @route   GET /api/progress/me
// @access  Private
const getUserProgress = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    const progressRecords = await UserProgress.find({ user: userId });
    res.status(200).json(progressRecords);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user progress' });
  }
});

export {
  recordProgress,
  getUserProgress,
};
