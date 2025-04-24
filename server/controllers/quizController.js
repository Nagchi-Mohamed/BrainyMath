import asyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import Quiz from '../models/quizModel.js';
import Question from '../models/questionModel.js';
import QuizResult from '../models/quizResultModel.js';

// @desc    Get all quizzes
// @route   GET /api/quizzes
// @access  Public
const getAllQuizzes = asyncHandler(async (req, res) => {
  const quizzes = await Quiz.find({}, 'title description category difficulty');
  res.status(200).json(quizzes);
});

// @desc    Get quiz by ID
// @route   GET /api/quizzes/:quizId
// @access  Public
const getQuizById = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.quizId, 'title description category difficulty');
  if (!quiz) {
    res.status(404);
    throw new Error('Quiz not found');
  }
  res.status(200).json(quiz);
});

// @desc    Create a new quiz
// @route   POST /api/quizzes
// @access  Private (Admin only)
const createQuiz = asyncHandler(async (req, res) => {
  const { title, description, category, difficulty, lessonRef } = req.body;

  const quiz = await Quiz.create({
    title,
    description,
    category,
    difficulty,
    lessonRef,
  });

  res.status(201).json(quiz);
});

// @desc    Add a question to a quiz
// @route   POST /api/quizzes/:quizId/questions
// @access  Private (Admin only)
const addQuestionToQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.quizId);
  if (!quiz) {
    res.status(404);
    throw new Error('Quiz not found');
  }

  const { text, options, correctAnswerIndex } = req.body;

  const question = await Question.create({
    quiz: req.params.quizId,
    text,
    options,
    correctAnswerIndex,
  });

  res.status(201).json(question);
});

// @desc    Get questions for a specific quiz
// @route   GET /api/quizzes/:quizId/questions
// @access  Public or Private (depending on quiz settings)
const getQuizQuestions = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.quizId);
  if (!quiz) {
    res.status(404);
    throw new Error('Quiz not found');
  }

  const questions = await Question.find({ quiz: req.params.quizId }, 'text options');
  res.status(200).json(questions);
});

// @desc    Update a quiz
// @route   PUT /api/quizzes/:quizId
// @access  Private (Admin only)
const updateQuiz = asyncHandler(async (req, res) => {
  const { quizId } = req.params;
  const { title, description, category, difficulty } = req.body;

  const quiz = await Quiz.findById(quizId);
  if (!quiz) {
    res.status(404);
    throw new Error('Quiz not found');
  }

  if (title) quiz.title = title;
  if (description) quiz.description = description;
  if (category) quiz.category = category;
  if (difficulty) quiz.difficulty = difficulty;

  const updatedQuiz = await quiz.save();
  res.status(200).json(updatedQuiz);
});

// @desc    Delete a quiz
// @route   DELETE /api/quizzes/:quizId
// @access  Private (Admin only)
const deleteQuiz = asyncHandler(async (req, res) => {
  const { quizId } = req.params;

  const quiz = await Quiz.findById(quizId);
  if (!quiz) {
    res.status(404);
    throw new Error('Quiz not found');
  }

  await Quiz.findByIdAndDelete(quizId);
  res.status(200).json({ message: 'Quiz deleted successfully' });
});

// @desc    Update a question
// @route   PUT /api/quizzes/:quizId/questions/:questionId
// @access  Private (Admin only)
const updateQuestion = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Update a question' });
});

// @desc    Delete a question
// @route   DELETE /api/quizzes/:quizId/questions/:questionId
// @access  Private (Admin only)
const deleteQuestion = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Delete a question' });
});

// @desc    Submit quiz answers and calculate score
// @route   POST /api/quizzes/:quizId/submit
// @access  Private
const submitQuiz = asyncHandler(async (req, res) => {
  const { quizId } = req.params;
  const { answers } = req.body;
  const userId = req.user._id;

  try {
    // Fetch all questions for the quiz
    const questions = await Question.find({ quiz: quizId }, 'correctAnswerIndex');

    if (!questions || questions.length === 0) {
      res.status(404);
      throw new Error('No questions found for this quiz');
    }

    // Calculate score
    let score = 0;
    const possibleScore = questions.length;

    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswerIndex) {
        score += 1;
      }
    });

    // Save the quiz result
    const quizResult = await QuizResult.create({
      user: userId,
      quiz: quizId,
      score,
      answers,
      possibleScore,
    });

    res.status(201).json({
      score,
      possibleScore,
      resultId: quizResult._id,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

export {
  getAllQuizzes,
  getQuizById,
  getQuizQuestions,
  createQuiz,
  addQuestionToQuiz,
  updateQuiz,
  deleteQuiz,
  updateQuestion,
  deleteQuestion,
  submitQuiz,
};