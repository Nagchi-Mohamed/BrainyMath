import request from 'supertest';
import mongoose from 'mongoose';
import { app, server } from '../../server.js';
import User from '../../models/userModel.js';
import UserProgress from '../../models/userProgressModel.js';
import generateToken from '../../utils/generateToken.js';
import dotenv from 'dotenv';
import { jest } from '@jest/globals';

// Load environment variables
dotenv.config();

// Store the original models to restore them after tests
const originalUserModel = mongoose.models.User;
const originalUserProgressModel = mongoose.models.UserProgress;

// Use MongoDB Atlas for testing with proper error handling
const TEST_DB_URL = process.env.MONGO_URI.replace('brainymath', 'brainymath_test');

describe('User Progress API Routes', () => {
    beforeAll(async () => {
        jest.setTimeout(60000); // Increase test timeout to 60 seconds
        try {
            // Close any existing connections
            await mongoose.disconnect();
            
            // Connect to the database with optimized settings
            await mongoose.connect(TEST_DB_URL, {
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
            });
            
            // Clear the collections
            await Promise.all([
                User.deleteMany({}),
                UserProgress.deleteMany({})
            ]);
            console.log('Collections cleared');
        } catch (error) {
            console.error('Error in beforeAll:', error);
            throw error;
        }
    });

    afterEach(async () => {
        try {
            // Clear the collections after each test
            await Promise.all([
                User.deleteMany({}),
                UserProgress.deleteMany({})
            ]);
        } catch (error) {
            console.error('Error in afterEach:', error);
        }
    });

    afterAll(async () => {
        try {
            // Clear the collections
            await Promise.all([
                User.deleteMany({}),
                UserProgress.deleteMany({})
            ]);
            // Close the database connection
            await mongoose.connection.close();
            // Close the server
            await new Promise((resolve) => server.close(resolve));
            // Restore the original models
            if (originalUserModel) {
                mongoose.models.User = originalUserModel;
            }
            if (originalUserProgressModel) {
                mongoose.models.UserProgress = originalUserProgressModel;
            }
            console.log('Test database connection closed and models restored');
        } catch (error) {
            console.error('Error in afterAll:', error);
        }
    });

    let userToken;
    let userId;
    let testProgress;

    beforeEach(async () => {
        try {
            // Create test user
            const user = await User.create({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            });
            userId = user._id;
            userToken = generateToken(userId);

            // Create test progress record
            testProgress = await UserProgress.create({
                user: userId,
                item: new mongoose.Types.ObjectId(),
                itemType: 'Lesson',
                status: 'Started',
                score: 80,
                possibleScore: 100
            });

        } catch (error) {
            console.error('Error in beforeEach:', error);
            throw error;
        }
    });

    describe('POST /api/user-progress', () => {
        it('should record new progress', async () => {
            const newProgress = {
                itemId: new mongoose.Types.ObjectId(),
                itemType: 'Quiz',
                status: 'Completed',
                score: 90,
                possibleScore: 100
            };

            const res = await request(app)
                .post('/api/user-progress')
                .set('Authorization', `Bearer ${userToken}`)
                .send(newProgress);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('user', userId.toString());
            expect(res.body).toHaveProperty('itemType', 'Quiz');
            expect(res.body).toHaveProperty('status', 'Completed');
            expect(res.body).toHaveProperty('score', 90);
            expect(res.body).toHaveProperty('completedAt');
        });

        it('should update existing progress', async () => {
            const updateProgress = {
                itemId: testProgress.item,
                itemType: 'Lesson',
                status: 'Completed',
                score: 95,
                possibleScore: 100
            };

            const res = await request(app)
                .post('/api/user-progress')
                .set('Authorization', `Bearer ${userToken}`)
                .send(updateProgress);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('status', 'Completed');
            expect(res.body).toHaveProperty('score', 95);
            expect(res.body).toHaveProperty('completedAt');
        });

        it('should validate required fields', async () => {
            const invalidProgress = {
                itemType: 'Quiz',
                status: 'Completed'
            };

            const res = await request(app)
                .post('/api/user-progress')
                .set('Authorization', `Bearer ${userToken}`)
                .send(invalidProgress);

            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('errors');
        });

        it('should validate item type', async () => {
            const invalidProgress = {
                itemId: new mongoose.Types.ObjectId(),
                itemType: 'InvalidType',
                status: 'Completed'
            };

            const res = await request(app)
                .post('/api/user-progress')
                .set('Authorization', `Bearer ${userToken}`)
                .send(invalidProgress);

            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('errors');
        });

        it('should validate status', async () => {
            const invalidProgress = {
                itemId: new mongoose.Types.ObjectId(),
                itemType: 'Quiz',
                status: 'InvalidStatus'
            };

            const res = await request(app)
                .post('/api/user-progress')
                .set('Authorization', `Bearer ${userToken}`)
                .send(invalidProgress);

            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('errors');
        });

        it('should handle database errors when recording progress', async () => {
            // Mock the findOneAndUpdate method to throw an error
            const originalFindOneAndUpdate = UserProgress.findOneAndUpdate;
            UserProgress.findOneAndUpdate = jest.fn().mockRejectedValue(new Error('Database error'));

            const newProgress = {
                itemId: new mongoose.Types.ObjectId(),
                itemType: 'Quiz',
                status: 'Completed',
                score: 90,
                possibleScore: 100
            };

            const res = await request(app)
                .post('/api/user-progress')
                .set('Authorization', `Bearer ${userToken}`)
                .send(newProgress);

            expect(res.status).toBe(500);
            expect(res.body).toHaveProperty('message', 'Failed to record progress');

            // Restore the original method
            UserProgress.findOneAndUpdate = originalFindOneAndUpdate;
        });
    });

    describe('GET /api/user-progress/me', () => {
        it('should get all progress for current user', async () => {
            const res = await request(app)
                .get('/api/user-progress/me')
                .set('Authorization', `Bearer ${userToken}`);

            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body.length).toBe(1);
            expect(res.body[0]).toHaveProperty('user', userId.toString());
            expect(res.body[0]).toHaveProperty('itemType', 'Lesson');
        });

        it('should return empty array if no progress exists', async () => {
            await UserProgress.deleteMany({});
            
            const res = await request(app)
                .get('/api/user-progress/me')
                .set('Authorization', `Bearer ${userToken}`);

            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body.length).toBe(0);
        });

        it('should require authentication', async () => {
            const res = await request(app)
                .get('/api/user-progress/me');

            expect(res.status).toBe(401);
        });

        it('should handle database errors when fetching progress', async () => {
            // Mock the find method to throw an error
            const originalFind = UserProgress.find;
            UserProgress.find = jest.fn().mockRejectedValue(new Error('Database error'));

            const res = await request(app)
                .get('/api/user-progress/me')
                .set('Authorization', `Bearer ${userToken}`);

            expect(res.status).toBe(500);
            expect(res.body).toHaveProperty('message', 'Failed to fetch user progress');

            // Restore the original method
            UserProgress.find = originalFind;
        });
    });
}); 