import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Use MongoDB Atlas for all environments
const DB_URL = process.env.NODE_ENV === 'test' 
  ? process.env.MONGO_URI.replace('brainymath', 'brainymath_test')
  : process.env.MONGO_URI;

const connectDB = async () => {
  try {
    // Always disconnect first in test environment
    if (process.env.NODE_ENV === 'test') {
      await mongoose.disconnect();
    }
    
    const conn = await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,
      maxPoolSize: 10,
      minPoolSize: 1,
      family: 4, // Force IPv4
      retryWrites: true,
      retryReads: true,
      // Add these options for better connection handling
      heartbeatFrequencyMS: 10000,
      maxIdleTimeMS: 60000,
      waitQueueTimeoutMS: 30000,
      // Add these options for better error handling
      autoIndex: true,
      autoCreate: true,
    });
    
    if (process.env.NODE_ENV !== 'test') {
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // Don't exit in test environment
    if (process.env.NODE_ENV !== 'test') {
      process.exit(1);
    }
    throw new Error('Failed to connect to database');
  }
};

export default connectDB;
