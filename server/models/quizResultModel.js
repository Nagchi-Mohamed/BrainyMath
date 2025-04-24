import mongoose from 'mongoose';

const quizResultSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    answers: {
      type: Object,
      required: true,
    },
    possibleScore: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const QuizResult = mongoose.model('QuizResult', quizResultSchema);

export default QuizResult;