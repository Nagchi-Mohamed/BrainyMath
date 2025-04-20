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

// Initialize forum data if empty
const forumData = readData('forum.json') || { categories: [], topics: [], posts: [] };
if (forumData.categories.length === 0) {
  // Add some initial categories
  forumData.categories = [
    {
      id: 1,
      title: 'General Discussion',
      description: 'General topics about mathematics',
      topicsCount: 0,
      postsCount: 0
    },
    {
      id: 2,
      title: 'Homework Help',
      description: 'Get help with your math homework',
      topicsCount: 0,
      postsCount: 0
    }
  ];
  writeData('forum.json', forumData);
}

// Get all categories
router.get('/categories', (req, res) => {
  try {
    const forumData = readData('forum.json');
    res.json(forumData.categories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get category by ID
router.get('/categories/:id', (req, res) => {
  try {
    const forumData = readData('forum.json');
    const category = forumData.categories.find(c => c.id === parseInt(req.params.id));
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all topics
router.get('/topics', (req, res) => {
  try {
    const forumData = readData('forum.json');
    res.json(forumData.topics);
  } catch (error) {
    console.error('Get topics error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get topics by category
router.get('/categories/:categoryId/topics', (req, res) => {
  try {
    const forumData = readData('forum.json');
    const categoryTopics = forumData.topics.filter(t => t.categoryId === parseInt(req.params.categoryId));
    res.json(categoryTopics);
  } catch (error) {
    console.error('Get category topics error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get topic by ID
router.get('/topics/:id', (req, res) => {
  try {
    const forumData = readData('forum.json');
    const topic = forumData.topics.find(t => t.id === parseInt(req.params.id));
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }
    res.json(topic);
  } catch (error) {
    console.error('Get topic error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get posts by topic
router.get('/topics/:topicId/posts', (req, res) => {
  try {
    const forumData = readData('forum.json');
    const topicPosts = forumData.posts.filter(p => p.topicId === parseInt(req.params.topicId));
    res.json(topicPosts);
  } catch (error) {
    console.error('Get topic posts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Content validation middleware
const validateContent = (content, type) => {
  const errors = [];
  
  if (!content || content.trim().length === 0) {
    errors.push(`${type} cannot be empty`);
  }
  
  if (type === 'title' && content.trim().length < 5) {
    errors.push('Title must be at least 5 characters long');
  }
  
  if (type === 'content' && content.trim().length < 20) {
    errors.push('Content must be at least 20 characters long');
  }
  
  // Check for potential XSS or malicious content
  const dangerousPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi
  ];
  
  dangerousPatterns.forEach(pattern => {
    if (pattern.test(content)) {
      errors.push('Content contains potentially dangerous elements');
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Create new topic
router.post('/topics', auth, (req, res) => {
  try {
    const { title, content, categoryId } = req.body;
    
    // Validate input
    if (!title || !content || !categoryId) {
      return res.status(400).json({ 
        error: 'VALIDATION_ERROR',
        message: 'All fields are required' 
      });
    }
    
    // Validate title and content
    const titleValidation = validateContent(title, 'title');
    const contentValidation = validateContent(content, 'content');
    
    if (!titleValidation.isValid || !contentValidation.isValid) {
      return res.status(400).json({ 
        error: 'VALIDATION_ERROR',
        message: 'Invalid content',
        details: [...titleValidation.errors, ...contentValidation.errors] 
      });
    }
    
    const forumData = readData('forum.json');
    
    // Check if category exists
    const category = forumData.categories.find(c => c.id === parseInt(categoryId));
    if (!category) {
      return res.status(404).json({ 
        error: 'NOT_FOUND',
        message: 'Category not found' 
      });
    }
    
    // Create new topic
    const newTopic = {
      id: Date.now(),
      title: title.trim(),
      author: { 
        id: req.user.id, 
        name: req.user.name 
      },
      categoryId: parseInt(categoryId),
      replies: 0,
      views: 0,
      lastPost: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      status: 'active'
    };
    
    // Create initial post
    const newPost = {
      id: Date.now() + 1,
      topicId: newTopic.id,
      author: { 
        id: req.user.id, 
        name: req.user.name 
      },
      content: content.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active'
    };
    
    // Update forum data
    forumData.topics.push(newTopic);
    forumData.posts.push(newPost);
    
    // Update category counts
    category.topicsCount += 1;
    category.postsCount += 1;
    category.lastActivity = new Date().toISOString();
    
    // Save updated data
    if (!writeData('forum.json', forumData)) {
      throw new Error('Failed to save forum data');
    }
    
    res.status(201).json({ 
      topic: newTopic, 
      post: newPost 
    });
  } catch (error) {
    console.error('Create topic error:', error);
    res.status(500).json({ 
      error: 'SERVER_ERROR',
      message: 'Error creating topic' 
    });
  }
});

// Create new post
router.post('/topics/:topicId/posts', auth, (req, res) => {
  try {
    const { content } = req.body;
    const topicId = parseInt(req.params.topicId);
    
    // Validate input
    if (!content) {
      return res.status(400).json({ 
        error: 'VALIDATION_ERROR',
        message: 'Content is required' 
      });
    }
    
    // Validate content
    const contentValidation = validateContent(content, 'content');
    if (!contentValidation.isValid) {
      return res.status(400).json({ 
        error: 'VALIDATION_ERROR',
        message: 'Invalid content',
        details: contentValidation.errors 
      });
    }
    
    const forumData = readData('forum.json');
    
    // Check if topic exists
    const topic = forumData.topics.find(t => t.id === topicId);
    if (!topic) {
      return res.status(404).json({ 
        error: 'NOT_FOUND',
        message: 'Topic not found' 
      });
    }
    
    // Check if topic is locked
    if (topic.status === 'locked') {
      return res.status(403).json({ 
        error: 'FORBIDDEN',
        message: 'Topic is locked' 
      });
    }
    
    // Create new post
    const newPost = {
      id: Date.now(),
      topicId,
      author: { 
        id: req.user.id, 
        name: req.user.name 
      },
      content: content.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active'
    };
    
    // Update forum data
    forumData.posts.push(newPost);
    
    // Update topic and category
    topic.replies += 1;
    topic.lastPost = new Date().toISOString();
    
    const category = forumData.categories.find(c => c.id === topic.categoryId);
    if (category) {
      category.postsCount += 1;
      category.lastActivity = new Date().toISOString();
    }
    
    // Save updated data
    if (!writeData('forum.json', forumData)) {
      throw new Error('Failed to save forum data');
    }
    
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ 
      error: 'SERVER_ERROR',
      message: 'Error creating post' 
    });
  }
});

// Search topics
router.get('/topics/search', (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    
    const forumData = readData('forum.json');
    const searchResults = forumData.topics.filter(topic => 
      topic.title.toLowerCase().includes(q.toLowerCase())
    );
    
    res.json(searchResults);
  } catch (error) {
    console.error('Search topics error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 