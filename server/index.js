import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import connectDB from './config/db.js'; // MongoDB connection

import forumRoutes from './routes/forumRoutes.js';
import groupRoutes from './routes/groupRoutes.js';
import lessonRoutes from './routes/lessonRoutes.js';
import userProgressRoutes from './routes/userProgress.js';
import authRoutes from './routes/authRoutes.js';
import gamesRoutes from './routes/games.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

if (!process.env.MONGO_URI) {
  console.error('MONGO_URI environment variable is not set.');
  process.exit(1);
}

connectDB(); // Connect to MongoDB

app.use(cors());
app.use(express.json());
app.use(helmet());

app.use('/api/forums', forumRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/user-progress', userProgressRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/games', gamesRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
