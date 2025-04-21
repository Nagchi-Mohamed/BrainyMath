import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from './config/db.js';
import User from './models/userModel.js';
import Lesson from './models/lessonModel.js';

dotenv.config();

const createSampleUsers = async () => {
  const hashedPasswordAdmin = await bcrypt.hash('password123', 12);
  const hashedPasswordUser = await bcrypt.hash('password123', 12);

  return [
    {
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPasswordAdmin,
      isAdmin: true,
    },
    {
      name: 'John Doe',
      email: 'john@example.com',
      password: hashedPasswordUser,
      isAdmin: false,
    },
    {
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: hashedPasswordUser,
      isAdmin: false,
    },
  ];
};

const sampleLessons = [
  {
    title: 'Introduction to Algebra',
    description: 'Learn the basics of algebraic expressions and equations.',
    content: 'Variables, constants, coefficients, like terms, solving linear equations...',
    category: 'Algebra',
    difficulty: 'Beginner',
  },
  {
    title: 'Pythagorean Theorem',
    description: 'Understand and apply the theorem for right-angled triangles.',
    content: 'a^2 + b^2 = c^2. Examples and applications.',
    category: 'Geometry',
    difficulty: 'Beginner',
  },
  {
    title: 'Basic Differentiation Rules',
    description: 'Learn the power rule, sum rule, and constant multiple rule.',
    content: 'Detailed explanation and examples of differentiation techniques.',
    category: 'Calculus',
    difficulty: 'Intermediate',
  },
];

const importData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Lesson.deleteMany();

    console.log('Existing data cleared...');

    const usersToInsert = await createSampleUsers();

    const createdUsers = await User.insertMany(usersToInsert);
    const createdLessons = await Lesson.insertMany(sampleLessons);

    const adminUser = createdUsers.find(u => u.isAdmin);
    console.log(`Admin user created with ID: ${adminUser?._id}`);
    console.log(`${createdLessons.length} lessons imported.`);

    console.log('-------------------------');
    console.log('Data Imported Successfully!');
    console.log('-------------------------');
    mongoose.connection.close();
    process.exit();
  } catch (error) {
    console.error(`Error importing data: ${error}`);
    mongoose.connection.close();
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Lesson.deleteMany();

    console.log('-------------------------');
    console.log('Data Destroyed Successfully!');
    console.log('-------------------------');
    mongoose.connection.close();
    process.exit();
  } catch (error) {
    console.error(`Error destroying data: ${error}`);
    mongoose.connection.close();
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  console.log('Destroying data...');
  destroyData();
} else {
  console.log('Importing data...');
  importData();
}
