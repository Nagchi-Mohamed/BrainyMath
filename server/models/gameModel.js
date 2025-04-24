import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  score: {
    type: Number,
    required: true,
    min: 0
  },
  timeSpent: {
    type: Number,
    required: true,
    min: 0
  },
  mistakes: {
    type: Number,
    required: true,
    min: 0
  },
  correctAnswers: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  totalQuestions: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  gameType: {
    type: String,
    required: true,
    enum: ['ADDITION', 'SUBTRACTION', 'MULTIPLICATION', 'DIVISION']
  },
  difficulty: {
    type: String,
    enum: ['EASY', 'MEDIUM', 'HARD'],
    default: 'MEDIUM'
  },
  details: {
    questions: [
      {
        question: String,
        correctAnswer: Number,
        userAnswer: Number,
        timeTaken: Number,
        isCorrect: Boolean
      }
    ]
  }
}, {
  timestamps: true
});

// Indexes for faster queries
gameSchema.index({ user: 1, createdAt: -1 });
gameSchema.index({ user: 1, gameType: 1, createdAt: -1 });

const Game = mongoose.model('Game', gameSchema);

export default Game; 