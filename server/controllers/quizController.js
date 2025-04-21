const Quiz = require('../models/quizModel');
const Question = require('../models/questionModel');
const QuizResult = require('../models/quizResultModel');

// List all quizzes
exports.listQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quizzes', error });
  }
};

// Get quiz details including questions
exports.getQuizDetails = async (req, res) => {
  try {
    const { quizId } = req.params;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    const questions = await Question.find({ quiz: quizId });
    res.status(200).json({ quiz, questions });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quiz details', error });
  }
};

// Submit quiz results
exports.submitQuizResults = async (req, res) => {
  try {
    const { quizId, answers } = req.body;
    const questions = await Question.find({ quiz: quizId });

    let score = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswerIndex) {
        score++;
      }
    });

    const quizResult = new QuizResult({
      user: req.user._id,
      quiz: quizId,
      score,
    });
    await quizResult.save();

    res.status(201).json({ message: 'Quiz submitted successfully', score });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting quiz results', error });
  }
};