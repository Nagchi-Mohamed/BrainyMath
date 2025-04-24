import { jest } from '@jest/globals';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;

// Enable buffering for tests
mongoose.set('bufferCommands', true);

// Setup MongoDB Memory Server
beforeAll(async () => {
  try {
    // Close any existing connections
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    
    // Create new in-memory MongoDB instance
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    process.env.MONGO_URI = mongoUri; // Set environment variable to memory server URI
    
    // Connect to the in-memory database
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('Connected to in-memory MongoDB instance');
  } catch (error) {
    console.error('Error in beforeAll:', error);
    throw error;
  }
});

// Clear database between tests
afterEach(async () => {
  if (mongoose.connection.readyState !== 1) {
    return; // Skip if not connected
  }
  
  try {
    // Clear all collections after each test
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
  } catch (error) {
    console.error('Error in afterEach:', error);
  }
});

// Cleanup MongoDB Memory Server
afterAll(async () => {
  try {
    // Clean up after tests
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    if (mongoServer) {
      await mongoServer.stop();
    }
    console.log('Disconnected from in-memory MongoDB instance');
  } catch (error) {
    console.error('Error in afterAll:', error);
  }
});

// Global error handler for unhandled promise rejections
process.on('unhandledRejection', (error) => {
  console.error('Unhandled Promise Rejection:', error);
});

// Increase timeout for tests
jest.setTimeout(60000);
