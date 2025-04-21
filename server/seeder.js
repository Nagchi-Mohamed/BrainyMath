import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Lesson from './models/Lesson.js';
import Progress from './models/UserProgress.js';
import connectDB from './config/database.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Lesson.deleteMany();
    await Progress.deleteMany();

    // Create sample users
    const users = [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123',
        isAdmin: true,
      },
      {
        name: 'Test User',
        email: 'test@example.com',
        password: 'test123',
      },
    ];

    const createdUsers = await User.insertMany(users);

    // Create sample lessons
    const lessons = [
      {
        title: 'Introduction to Algebra',
        description: 'Basic concepts of algebra',
        content: 'Algebra content here...',
        category: 'Algebra',
        difficulty: 'Beginner',
        author: createdUsers[0]._id,
      },
      {
        title: 'Geometry Basics',
        description: 'Learn about shapes and angles',
        content: 'Geometry content here...',
        category: 'Geometry',
        difficulty: 'Beginner',
        author: createdUsers[0]._id,
      },
    ];

    await Lesson.insertMany(lessons);

    console.log('Data seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
