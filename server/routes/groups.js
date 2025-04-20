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

// Mock data for initial groups
const mockGroups = [
  {
    id: '1',
    name: 'Algebra Study Group',
    description: 'A group for students learning algebra',
    level: 'beginner',
    members: ['1', '2'],
    nextSession: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Geometry Enthusiasts',
    description: 'Advanced geometry discussion group',
    level: 'intermediate',
    members: ['2'],
    nextSession: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString()
  }
];

// Initialize groups data if empty
const groups = readData('groups.json') || [];
if (groups.length === 0) {
  writeData('groups.json', mockGroups);
}

// Group validation middleware
const validateGroup = (group) => {
  const errors = [];
  
  if (!group.name || group.name.trim().length < 3) {
    errors.push('Group name must be at least 3 characters long');
  }
  
  if (!group.description || group.description.trim().length < 10) {
    errors.push('Group description must be at least 10 characters long');
  }
  
  if (!['beginner', 'intermediate', 'advanced'].includes(group.level)) {
    errors.push('Invalid group level');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Get all groups
router.get('/', (req, res) => {
  try {
    const groups = readData('groups.json');
    res.json(groups);
  } catch (error) {
    console.error('Get groups error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get current user's groups
router.get('/user', auth, (req, res) => {
  try {
    const groups = readData('groups.json');
    const userGroups = groups.filter(group => group.members.includes(req.user.id));
    res.json(userGroups);
  } catch (error) {
    console.error('Get user groups error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get group by ID
router.get('/:id', (req, res) => {
  try {
    const groups = readData('groups.json');
    const group = groups.find(group => group.id === req.params.id);
    
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    
    res.json(group);
  } catch (error) {
    console.error('Get group error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new group
router.post('/', auth, (req, res) => {
  try {
    const { name, description, level } = req.body;
    
    // Validate input
    if (!name || !description || !level) {
      return res.status(400).json({ 
        error: 'VALIDATION_ERROR',
        message: 'All fields are required' 
      });
    }
    
    // Validate group data
    const groupData = { name, description, level };
    const validation = validateGroup(groupData);
    if (!validation.isValid) {
      return res.status(400).json({ 
        error: 'VALIDATION_ERROR',
        message: 'Invalid group data',
        details: validation.errors 
      });
    }
    
    const groups = readData('groups.json');
    const newGroup = {
      id: Date.now().toString(),
      name: name.trim(),
      description: description.trim(),
      level,
      members: [req.user.id],
      nextSession: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      createdBy: req.user.id
    };
    
    groups.push(newGroup);
    if (!writeData('groups.json', groups)) {
      throw new Error('Failed to save group data');
    }
    
    res.status(201).json(newGroup);
  } catch (error) {
    console.error('Create group error:', error);
    res.status(500).json({ 
      error: 'SERVER_ERROR',
      message: 'Error creating group' 
    });
  }
});

// Update group
router.put('/:id', auth, (req, res) => {
  try {
    const { name, description, level, nextSession } = req.body;
    const groups = readData('groups.json');
    const groupIndex = groups.findIndex(group => group.id === req.params.id);
    
    if (groupIndex === -1) {
      return res.status(404).json({ 
        error: 'NOT_FOUND',
        message: 'Group not found' 
      });
    }
    
    // Check if user is a member
    if (!groups[groupIndex].members.includes(req.user.id)) {
      return res.status(403).json({ 
        error: 'FORBIDDEN',
        message: 'Not authorized to update this group' 
      });
    }
    
    // Validate group data if provided
    if (name || description || level) {
      const groupData = {
        name: name || groups[groupIndex].name,
        description: description || groups[groupIndex].description,
        level: level || groups[groupIndex].level
      };
      
      const validation = validateGroup(groupData);
      if (!validation.isValid) {
        return res.status(400).json({ 
          error: 'VALIDATION_ERROR',
          message: 'Invalid group data',
          details: validation.errors 
        });
      }
    }
    
    const updatedGroup = {
      ...groups[groupIndex],
      name: name ? name.trim() : groups[groupIndex].name,
      description: description ? description.trim() : groups[groupIndex].description,
      level: level || groups[groupIndex].level,
      nextSession: nextSession || groups[groupIndex].nextSession,
      updatedAt: new Date().toISOString(),
      updatedBy: req.user.id
    };
    
    groups[groupIndex] = updatedGroup;
    if (!writeData('groups.json', groups)) {
      throw new Error('Failed to update group data');
    }
    
    res.json(updatedGroup);
  } catch (error) {
    console.error('Update group error:', error);
    res.status(500).json({ 
      error: 'SERVER_ERROR',
      message: 'Error updating group' 
    });
  }
});

// Delete group
router.delete('/:id', auth, (req, res) => {
  try {
    const groups = readData('groups.json');
    const groupIndex = groups.findIndex(group => group.id === req.params.id);
    
    if (groupIndex === -1) {
      return res.status(404).json({ message: 'Group not found' });
    }
    
    // Check if user is a member
    if (!groups[groupIndex].members.includes(req.user.id)) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    groups.splice(groupIndex, 1);
    writeData('groups.json', groups);
    
    res.json({ message: 'Group deleted successfully' });
  } catch (error) {
    console.error('Delete group error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add member to group
router.post('/:id/members', auth, (req, res) => {
  try {
    const groups = readData('groups.json');
    const groupIndex = groups.findIndex(group => group.id === req.params.id);
    
    if (groupIndex === -1) {
      return res.status(404).json({ message: 'Group not found' });
    }
    
    // Check if user is already a member
    if (groups[groupIndex].members.includes(req.user.id)) {
      return res.status(400).json({ message: 'Already a member' });
    }
    
    groups[groupIndex].members.push(req.user.id);
    writeData('groups.json', groups);
    
    res.json({ message: 'Member added successfully' });
  } catch (error) {
    console.error('Add member error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove member from group
router.delete('/:id/members/:userId', auth, (req, res) => {
  try {
    const groups = readData('groups.json');
    const groupIndex = groups.findIndex(group => group.id === req.params.id);
    
    if (groupIndex === -1) {
      return res.status(404).json({ message: 'Group not found' });
    }
    
    const memberIndex = groups[groupIndex].members.indexOf(req.params.userId);
    if (memberIndex === -1) {
      return res.status(404).json({ message: 'Member not found' });
    }
    
    groups[groupIndex].members.splice(memberIndex, 1);
    writeData('groups.json', groups);
    
    res.json({ message: 'Member removed successfully' });
  } catch (error) {
    console.error('Remove member error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 