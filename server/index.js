const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Apply middleware
app.use(helmet());
app.use(express.json());

// Trust proxy for rate limiter
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

// Configure rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  trustProxy: process.env.NODE_ENV === 'development', // Trust proxy in development
  skip: (req) => {
    // Skip rate limiting for development hot reload requests
    if (process.env.NODE_ENV === 'development') {
      return req.path.includes('hot-update.json') || 
             req.path.includes('logo192.png') ||
             req.path.includes('favicon.ico');
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

// Create data directory if it doesn't exist
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// File-based data access functions with enhanced error handling
const readData = (filename) => {
  const filePath = path.join(dataDir, filename);
  try {
    if (!fs.existsSync(filePath)) {
      console.error(`File ${filename} does not exist`);
      return null;
    }
    const data = fs.readFileSync(filePath, 'utf8');
    if (!data) {
      console.error(`File ${filename} is empty`);
      return null;
    }
    const parsedData = JSON.parse(data);
    return parsedData;
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    if (error instanceof SyntaxError) {
      console.error(`Invalid JSON in ${filename}`);
    }
    return null;
  }
};

const writeData = (filename, data) => {
  const filePath = path.join(dataDir, filename);
  try {
    // Validate data before writing
    if (data === undefined || data === null) {
      throw new Error('Cannot write undefined or null data');
    }
    
    // Create backup before writing
    if (fs.existsSync(filePath)) {
      const backupPath = `${filePath}.backup`;
      fs.copyFileSync(filePath, backupPath);
    }
    
    // Write new data
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    
    // Verify written data
    const verifyData = readData(filename);
    if (!verifyData) {
      throw new Error('Data verification failed after writing');
    }
    
    return true;
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    return false;
  }
};

// Initialize data files with validation
const initializeDataFile = (filename, defaultData) => {
  const filePath = path.join(dataDir, filename);
  try {
    if (!fs.existsSync(filePath)) {
      if (!writeData(filename, defaultData)) {
        throw new Error(`Failed to initialize ${filename}`);
      }
      console.log(`Initialized ${filename} with default data`);
    }
    return filePath;
  } catch (error) {
    console.error(`Error initializing ${filename}:`, error);
    throw error;
  }
};

// Initialize data files
initializeDataFile('users.json', []);
initializeDataFile('lessons.json', []);
initializeDataFile('groups.json', []);
initializeDataFile('forum.json', { categories: [], topics: [], posts: [] });
initializeDataFile('games.json', []);

// Import routes
const authRoutes = require('./routes/auth');
const lessonRoutes = require('./routes/lessons');
const groupRoutes = require('./routes/groups');
const forumRoutes = require('./routes/forum');
const gameRoutes = require('./routes/games');

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/games', gameRoutes);

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
const startServer = () => {
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
};

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

// Start server
startServer(); 