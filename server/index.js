import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';

import connectDB from './config/db.js';

import forumRoutes from './routes/forumRoutes.js';
import groupRoutes from './routes/groupRoutes.js';
import lessonRoutes from './routes/lessonRoutes.js';
import userProgressRoutes from './routes/userProgressRoutes.js';
import authRoutes from './routes/authRoutes.js';
import gamesRoutes from './routes/games.js';
import quizRoutes from './routes/quizRoutes.js';
import classroomRoutes from './routes/classroomRoutes.js';

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(helmet());

app.use('/api/forums', forumRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/user-progress', userProgressRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/games', gamesRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/classrooms', classroomRoutes);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export { app };
