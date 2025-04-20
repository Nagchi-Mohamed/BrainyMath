const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const auth = require('../middleware/auth');

// File-based data access functions
const readData = (filename) => {
  const filePath = path.join(__dirname, '..', 'data', filename);
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return null;
  }
};

const writeData = (filename, data) => {
  const filePath = path.join(__dirname, '..', 'data', filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    return false;
  }
};

// Mock data for initial lessons
const mockLessons = [
  {
    id: '1',
    title: 'Introduction to Algebra',
    description: 'Learn the basics of algebraic expressions and equations',
    content: 'This lesson covers fundamental algebraic concepts...',
    level: 'beginner',
    duration: 60,
    order: 1,
    category: 'algebra',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Basic Geometry',
    description: 'Explore shapes, angles, and geometric principles',
    content: 'This lesson introduces basic geometric concepts...',
    level: 'beginner',
    duration: 45,
    order: 2,
    category: 'geometry',
    createdAt: new Date().toISOString()
  }
];

// Initialize lessons data if empty
const lessons = readData('lessons.json') || [];
if (lessons.length === 0) {
  writeData('lessons.json', mockLessons);
}

// Lesson validation middleware
const validateLesson = (lesson) => {
  const errors = [];
  
  if (!lesson.title || lesson.title.trim().length < 5) {
    errors.push('Title must be at least 5 characters long');
  }
  
  if (!lesson.description || lesson.description.trim().length < 20) {
    errors.push('Description must be at least 20 characters long');
  }
  
  if (!lesson.content || lesson.content.trim().length < 50) {
    errors.push('Content must be at least 50 characters long');
  }
  
  if (!['beginner', 'intermediate', 'advanced'].includes(lesson.level)) {
    errors.push('Invalid lesson level');
  }
  
  if (!lesson.duration || lesson.duration < 5 || lesson.duration > 180) {
    errors.push('Duration must be between 5 and 180 minutes');
  }
  
  if (!lesson.category || !['algebra', 'geometry', 'calculus', 'statistics'].includes(lesson.category)) {
    errors.push('Invalid lesson category');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Get all lessons
router.get('/', (req, res) => {
  try {
    const lessons = readData('lessons.json') || mockLessons;
    res.json(lessons);
  } catch (error) {
    console.error('Get lessons error:', error);
    res.status(500).json({ 
      error: 'SERVER_ERROR',
      message: 'Error retrieving lessons' 
    });
  }
});

// Get lesson by ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ID
    if (!id || id === 'undefined') {
      return res.status(400).json({ 
        error: 'VALIDATION_ERROR',
        message: 'Invalid lesson ID' 
      });
    }
    
    const lessons = readData('lessons.json');
    const lesson = lessons.find(lesson => lesson.id === id);
    
    if (!lesson) {
      return res.status(404).json({ 
        error: 'NOT_FOUND',
        message: 'Lesson not found' 
      });
    }
    
    res.json(lesson);
  } catch (error) {
    console.error('Get lesson error:', error);
    res.status(500).json({ 
      error: 'SERVER_ERROR',
      message: 'Error retrieving lesson' 
    });
  }
});

// Create new lesson
router.post('/', auth, (req, res) => {
  try {
    const { title, description, content, level, duration, category } = req.body;
    
    // Validate input
    if (!title || !description || !content || !level || !duration || !category) {
      return res.status(400).json({ 
        error: 'VALIDATION_ERROR',
        message: 'All fields are required' 
      });
    }
    
    // Validate lesson data
    const lessonData = { title, description, content, level, duration, category };
    const validation = validateLesson(lessonData);
    if (!validation.isValid) {
      return res.status(400).json({ 
        error: 'VALIDATION_ERROR',
        message: 'Invalid lesson data',
        details: validation.errors 
      });
    }
    
    const lessons = readData('lessons.json');
    const newLesson = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      content: content.trim(),
      level,
      duration: parseInt(duration),
      order: lessons.length + 1,
      category,
      createdAt: new Date().toISOString(),
      createdBy: req.user.id,
      status: 'active'
    };
    
    lessons.push(newLesson);
    if (!writeData('lessons.json', lessons)) {
      throw new Error('Failed to save lesson data');
    }
    
    res.status(201).json(newLesson);
  } catch (error) {
    console.error('Create lesson error:', error);
    res.status(500).json({ 
      error: 'SERVER_ERROR',
      message: 'Error creating lesson' 
    });
  }
});

// Update lesson
router.put('/:id', auth, (req, res) => {
  try {
    const { title, description, content, level, duration, category } = req.body;
    const lessons = readData('lessons.json');
    const lessonIndex = lessons.findIndex(lesson => lesson.id === req.params.id);
    
    if (lessonIndex === -1) {
      return res.status(404).json({ 
        error: 'NOT_FOUND',
        message: 'Lesson not found' 
      });
    }
    
    // Check if user is authorized (teacher or admin)
    if (req.user.role !== 'teacher' && req.user.role !== 'admin') {
      return res.status(403).json({ 
        error: 'FORBIDDEN',
        message: 'Not authorized to update lessons' 
      });
    }
    
    // Validate lesson data if provided
    if (title || description || content || level || duration || category) {
      const lessonData = {
        title: title || lessons[lessonIndex].title,
        description: description || lessons[lessonIndex].description,
        content: content || lessons[lessonIndex].content,
        level: level || lessons[lessonIndex].level,
        duration: duration || lessons[lessonIndex].duration,
        category: category || lessons[lessonIndex].category
      };
      
      const validation = validateLesson(lessonData);
      if (!validation.isValid) {
        return res.status(400).json({ 
          error: 'VALIDATION_ERROR',
          message: 'Invalid lesson data',
          details: validation.errors 
        });
      }
    }
    
    const updatedLesson = {
      ...lessons[lessonIndex],
      title: title ? title.trim() : lessons[lessonIndex].title,
      description: description ? description.trim() : lessons[lessonIndex].description,
      content: content ? content.trim() : lessons[lessonIndex].content,
      level: level || lessons[lessonIndex].level,
      duration: duration ? parseInt(duration) : lessons[lessonIndex].duration,
      category: category || lessons[lessonIndex].category,
      updatedAt: new Date().toISOString(),
      updatedBy: req.user.id
    };
    
    lessons[lessonIndex] = updatedLesson;
    if (!writeData('lessons.json', lessons)) {
      throw new Error('Failed to update lesson data');
    }
    
    res.json(updatedLesson);
  } catch (error) {
    console.error('Update lesson error:', error);
    res.status(500).json({ 
      error: 'SERVER_ERROR',
      message: 'Error updating lesson' 
    });
  }
});

// Delete lesson
router.delete('/:id', auth, (req, res) => {
  try {
    const lessons = readData('lessons.json');
    const lessonIndex = lessons.findIndex(lesson => lesson.id === req.params.id);
    
    if (lessonIndex === -1) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    
    lessons.splice(lessonIndex, 1);
    writeData('lessons.json', lessons);
    
    res.json({ message: 'Lesson deleted successfully' });
  } catch (error) {
    console.error('Delete lesson error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Track lesson progress
router.post('/:id/progress', auth, (req, res) => {
  try {
    const { score } = req.body;
    const lessonId = req.params.id;
    const userId = req.user.id;

    // Get user progress data
    const users = readData('users.json');
    const userIndex = users.findIndex(user => user.id === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Initialize progress if it doesn't exist
    if (!users[userIndex].progress) {
      users[userIndex].progress = {
        completedLessons: [],
        quizScores: []
      };
    }

    // Add lesson to completed lessons if not already there
    if (!users[userIndex].progress.completedLessons.includes(lessonId)) {
      users[userIndex].progress.completedLessons.push(lessonId);
    }

    // Add quiz score
    users[userIndex].progress.quizScores.push({
      lessonId,
      score,
      completedAt: new Date().toISOString()
    });

    // Save updated user data
    writeData('users.json', users);

    res.json({ message: 'Progress updated successfully' });
  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({ message: 'Error updating progress' });
  }
});

// Get user's progress for a lesson
router.get('/:id/progress', auth, (req, res) => {
  try {
    const lessonId = req.params.id;
    const userId = req.user.id;

    // Get user progress data
    const users = readData('users.json');
    const user = users.find(user => user.id === userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get progress for the lesson
    const progress = {
      completed: user.progress?.completedLessons?.includes(lessonId) || false,
      score: user.progress?.quizScores?.find(score => score.lessonId === lessonId) || null
    };

    res.json(progress);
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ message: 'Error fetching progress' });
  }
});

module.exports = router; 