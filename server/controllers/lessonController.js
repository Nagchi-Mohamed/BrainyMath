// backend/controllers/lessonController.js
import asyncHandler from 'express-async-handler';
import Lesson from '../models/lessonModel.js';
import { validationResult } from 'express-validator';

// @desc    Get all lessons
// @route   GET /api/lessons
// @access  Public
const getLessons = asyncHandler(async (req, res) => {
  const lessons = await Lesson.find({});
  res.json(lessons);
});

// @desc    Get lesson by ID
// @route   GET /api/lessons/:id
// @access  Public
const getLessonById = asyncHandler(async (req, res) => {
  const lesson = await Lesson.findById(req.params.id);

  if (lesson) {
    res.json(lesson);
  } else {
    res.status(404);
    throw new Error('Lesson not found');
  }
});

// @desc    Create a new lesson
// @route   POST /api/lessons
// @access  Private/Admin
const createLesson = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, content, category, difficulty } = req.body;

  const lesson = new Lesson({
    title,
    description,
    content,
    category,
    difficulty,
  });

  const createdLesson = await lesson.save();
  res.status(201).json(createdLesson);
});

// @desc    Update a lesson
// @route   PUT /api/lessons/:id
// @access  Private/Admin
const updateLesson = asyncHandler(async (req, res) => {
  const lesson = await Lesson.findById(req.params.id);

  if (lesson) {
    lesson.title = req.body.title || lesson.title;
    lesson.description = req.body.description || lesson.description;
    lesson.content = req.body.content || lesson.content;
    lesson.category = req.body.category || lesson.category;
    lesson.difficulty = req.body.difficulty || lesson.difficulty;

    const updatedLesson = await lesson.save();
    res.json(updatedLesson);
  } else {
    res.status(404);
    throw new Error('Lesson not found');
  }
});

// @desc    Delete a lesson
// @route   DELETE /api/lessons/:id
// @access  Private/Admin
const deleteLesson = asyncHandler(async (req, res) => {
  const lesson = await Lesson.findById(req.params.id);

  if (lesson) {
    await Lesson.deleteOne({ _id: lesson._id });
    res.json({ message: 'Lesson removed successfully' });
  } else {
    res.status(404);
    throw new Error('Lesson not found');
  }
});

export {
  getLessons,
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson,
};
