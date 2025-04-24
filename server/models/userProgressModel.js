import mongoose from 'mongoose';

const userProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    itemType: {
      type: String,
      required: true,
      enum: ['Lesson', 'Quiz', 'Game'],
      index: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['Completed', 'Started', 'Passed', 'Failed'],
      default: 'Started',
    },
    score: {
      type: Number,
    },
    possibleScore: {
      type: Number,
    },
    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Compound unique index to ensure one progress record per user-item-itemType combination
userProgressSchema.index({ user: 1, item: 1, itemType: 1 }, { unique: true });

const UserProgress = mongoose.model('UserProgress', userProgressSchema);

export default UserProgress;