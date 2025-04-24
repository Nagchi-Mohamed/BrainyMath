import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import lessonRoutes from './routes/lessonRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import classroomRoutes from './routes/classroomRoutes.js';
import userProgressRoutes from './routes/userProgressRoutes.js';
import gamesRoutes from './routes/gameRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running' });
});

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/classrooms', classroomRoutes);
app.use('/api/user-progress', userProgressRoutes);
app.use('/api/games', gamesRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

let server;

// Connect to MongoDB
if (process.env.NODE_ENV !== 'test') {
  // In production/development, connect to MongoDB Atlas
  connectDB()
    .then(() => {
      console.log('MongoDB connected successfully');
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err);
    });
} else {
  // In test, use the MongoDB memory server (connection managed by setupTestDB.js)
  console.log('Using in-memory MongoDB for tests');
}

// Start server
if (process.env.NODE_ENV !== 'test') {
  server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} else {
  // In test environment, start the server on a random available port to avoid conflicts
  server = app.listen(0, () => {
    const address = server.address();
    console.log(`Test server running on port ${address.port}`);
  });
}

export { app, server };
