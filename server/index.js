import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

// Load environment variables
dotenv.config();

const { sequelize, testConnection } = require('./config/database.js');
import * as models from './models/index.js';

// Create Express app
const app = express();

// Apply middleware
app.use(helmet());
app.use(express.json());

// Trust proxy headers (add before rate limiter)
app.set('trust proxy', 1);

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.ALLOWED_ORIGINS?.split(',') || ['https://yourdomain.com']
    : ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Apply CORS
app.use(cors(corsOptions));

// Rate limiter configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  skip: (req) => {
    // Skip rate limiting for development hot reload requests
    if (process.env.NODE_ENV === 'development' && req.path.includes('hot-update')) {
      return true;
    }
    return false;
  }
});

// Apply rate limiter to all routes
app.use(limiter);

// Add request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

import authRoutes from './routes/authRoutes.js';
import lessonRoutes from './routes/lessonRoutes.js';
import groupRoutes from './routes/groupRoutes.js';
import forumRoutes from './routes/forumRoutes.js';
import gamesRoutes from './routes/games.js';
import userProgressRoutes from './routes/userProgress.js';

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/games', gamesRoutes);
app.use('/api/progress', userProgressRoutes);

// Request validation middleware
app.use((req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ 
        error: 'VALIDATION_ERROR',
        message: 'Request body cannot be empty' 
      });
    }
  }
  next();
});

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, '../build')));

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
} else {
  // Test route for development
  app.get('/', (req, res) => {
    res.json({ message: 'BrainyMath API is running' });
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  
  // Handle specific error types
  if (err.name === 'ValidationError') {
    return res.status(400).json({ 
      error: 'VALIDATION_ERROR',
      message: err.message 
    });
  }
  
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ 
      error: 'AUTH_ERROR',
      message: 'Invalid token' 
    });
  }
  
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ 
      error: 'AUTH_ERROR',
      message: 'Token has expired' 
    });
  }
  
  // Default error response
  res.status(err.status || 500).json({ 
    error: 'SERVER_ERROR',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Start server
const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    // Test database connection
    await testConnection();
    
    // Sync database models
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    console.log('Database models synchronized');
    
    // Start server
    const server = app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log('Environment:', process.env.NODE_ENV || 'development');
      console.log('Available endpoints:');
      console.log('- GET  /');
      console.log('- GET  /api/lessons');
      console.log('- GET  /api/groups');
      console.log('- GET  /api/forum/categories');
      console.log('- GET  /api/games');
    }).on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please try a different port or close the application using this port.`);
        process.exit(1);
      } else {
        console.error('Server error:', err);
        process.exit(1);
      }
    });

    // Handle graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM received. Shutting down gracefully...');
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();
