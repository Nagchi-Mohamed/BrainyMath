const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  associatedLesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
  },
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);