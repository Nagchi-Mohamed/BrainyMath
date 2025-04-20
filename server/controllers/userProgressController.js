const UserProgress = require('../models/UserProgress');
const Lesson = require('../models/Lesson');
const { sequelize } = require('sequelize');

// Get progress for a specific user
exports.getUserProgress = async (req, res) => {
  try {
    const progress = await UserProgress.findAll({
      where: { userId: req.user.id },
      include: [{
        model: Lesson,
        attributes: ['title', 'level', 'duration']
      }],
      order: [['updatedAt', 'DESC']]
    });
    res.json(progress);
  } catch (error) {
    console.error('Error fetching user progress:', error);
    res.status(500).json({ error: 'Failed to fetch user progress' });
  }
};

// Get progress for a specific lesson
exports.getLessonProgress = async (req, res) => {
  try {
    const progress = await UserProgress.findOne({
      where: {
        userId: req.user.id,
        lessonId: req.params.lessonId
      },
      include: [{
        model: Lesson,
        attributes: ['title', 'level', 'duration']
      }]
    });
    
    if (!progress) {
      return res.status(404).json({ error: 'Progress not found' });
    }
    
    res.json(progress);
  } catch (error) {
    console.error('Error fetching lesson progress:', error);
    res.status(500).json({ error: 'Failed to fetch lesson progress' });
  }
};

// Update progress for a lesson
exports.updateProgress = async (req, res) => {
  try {
    const { lessonId, status, score } = req.body;
    
    const [progress, created] = await UserProgress.findOrCreate({
      where: {
        userId: req.user.id,
        lessonId
      },
      defaults: {
        status: 'not_started',
        score: null
      }
    });

    const updates = {
      status,
      score: score || progress.score,
      lastAttemptedAt: new Date()
    };

    if (status === 'completed') {
      updates.completedAt = new Date();
    }

    await progress.update(updates);
    
    res.json(progress);
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ error: 'Failed to update progress' });
  }
};

// Get user's overall progress statistics
exports.getProgressStats = async (req, res) => {
  try {
    const stats = await UserProgress.findAll({
      where: { userId: req.user.id },
      attributes: [
        'status',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      group: ['status']
    });

    const totalLessons = await Lesson.count();
    const completedLessons = stats.find(s => s.status === 'completed')?.count || 0;
    const inProgressLessons = stats.find(s => s.status === 'in_progress')?.count || 0;
    const notStartedLessons = totalLessons - completedLessons - inProgressLessons;

    res.json({
      total: totalLessons,
      completed: completedLessons,
      inProgress: inProgressLessons,
      notStarted: notStartedLessons,
      completionPercentage: (completedLessons / totalLessons) * 100
    });
  } catch (error) {
    console.error('Error fetching progress stats:', error);
    res.status(500).json({ error: 'Failed to fetch progress statistics' });
  }
};
