const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

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

// Mock data for initial users
const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: '$2a$10$X7UrE9N9Z.1Z.1Z.1Z.1Z.1Z.1Z.1Z.1Z.1Z.1Z.1Z.1Z.1Z', // "password123"
    role: 'student',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: '$2a$10$X7UrE9N9Z.1Z.1Z.1Z.1Z.1Z.1Z.1Z.1Z.1Z.1Z.1Z.1Z.1Z', // "password123"
    role: 'teacher',
    createdAt: new Date().toISOString()
  }
];

// Initialize users data if empty
const users = readData('users.json') || [];
if (users.length === 0) {
  writeData('users.json', mockUsers);
}

// Password validation middleware
const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  const errors = [];
  if (password.length < minLength) errors.push('Password must be at least 8 characters long');
  if (!hasUpperCase) errors.push('Password must contain at least one uppercase letter');
  if (!hasLowerCase) errors.push('Password must contain at least one lowercase letter');
  if (!hasNumbers) errors.push('Password must contain at least one number');
  if (!hasSpecialChar) errors.push('Password must contain at least one special character');
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// User data sanitization
const sanitizeUserData = (user) => {
  const { password, ...sanitizedUser } = user;
  return sanitizedUser;
};

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ 
        error: 'VALIDATION_ERROR',
        message: 'All fields are required' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'VALIDATION_ERROR',
        message: 'Invalid email format' 
      });
    }

    // Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return res.status(400).json({ 
        error: 'VALIDATION_ERROR',
        message: 'Password validation failed',
        details: passwordValidation.errors 
      });
    }

    // Check if user already exists
    const users = readData('users.json');
    const existingUser = users.find(user => user.email === email.toLowerCase().trim());
    if (existingUser) {
      return res.status(400).json({ 
        error: 'VALIDATION_ERROR',
        message: 'User already exists' 
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: role || 'student',
      createdAt: new Date().toISOString()
    };

    // Add user to data store
    users.push(newUser);
    if (!writeData('users.json', users)) {
      throw new Error('Failed to save user data');
    }

    // Create JWT token
    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: process.env.JWT_EXPIRATION || '24h' }
    );

    res.status(201).json({
      token,
      user: sanitizeUserData(newUser)
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      error: 'SERVER_ERROR',
      message: 'Error during registration' 
    });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'VALIDATION_ERROR',
        message: 'Email and password are required' 
      });
    }

    // Find user
    const users = readData('users.json');
    const user = users.find(user => user.email === email.toLowerCase().trim());
    
    if (!user) {
      return res.status(401).json({ 
        error: 'AUTH_ERROR',
        message: 'Invalid credentials' 
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ 
        error: 'AUTH_ERROR',
        message: 'Invalid credentials' 
      });
    }

    // Create JWT token
    const token = jwt.sign(
      { 
        id: user.id, 
        role: user.role,
        email: user.email
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { 
        expiresIn: process.env.JWT_EXPIRATION || '24h',
        algorithm: 'HS256'
      }
    );

    // Update last login
    user.lastLogin = new Date().toISOString();
    if (!writeData('users.json', users)) {
      console.error('Failed to update last login time');
    }

    res.json({
      token,
      user: sanitizeUserData(user)
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      error: 'SERVER_ERROR',
      message: 'Error during login' 
    });
  }
});

// Get current user
router.get('/me', (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ 
        error: 'AUTH_ERROR',
        message: 'No token, authorization denied' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', {
      algorithms: ['HS256']
    });
    
    const users = readData('users.json');
    const user = users.find(user => user.id === decoded.id);
    
    if (!user) {
      return res.status(404).json({ 
        error: 'NOT_FOUND',
        message: 'User not found' 
      });
    }

    res.json(sanitizeUserData(user));
  } catch (error) {
    console.error('Get user error:', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        error: 'AUTH_ERROR',
        message: 'Invalid token' 
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        error: 'AUTH_ERROR',
        message: 'Token has expired' 
      });
    }
    res.status(500).json({ 
      error: 'SERVER_ERROR',
      message: 'Error retrieving user data' 
    });
  }
});

module.exports = router; 