// backend/models/lessonModel.js
import mongoose from 'mongoose';

const lessonSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a lesson title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a lesson description'],
    },
    content: {
      type: String, // Could be Markdown, HTML, or structured JSON
      required: [true, 'Please add lesson content'],
    },
    category: {
      type: String,
      required: [true, 'Please specify a category'],
      enum: ['Algebra', 'Geometry', 'Calculus', 'Statistics', 'General'], // Example categories
    },
    difficulty: {
      type: String,
      required: [true, 'Please specify difficulty'],
      enum: ['Beginner', 'Intermediate', 'Advanced'],
    },
  },
  {
    timestamps: true,
  }
);

const Lesson = mongoose.model('Lesson', lessonSchema);

export default Lesson;
