import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
  {
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true,
      index: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
    options: {
      type: [String],
      required: true,
      validate: [arrayLimit, 'Options must have at least two choices'],
    },
    correctAnswerIndex: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

function arrayLimit(val) {
  return val.length >= 2;
}

const Question = mongoose.model('Question', questionSchema);

export default Question;