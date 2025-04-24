import request from 'supertest';
import mongoose from 'mongoose';
import { app, server } from '../../server.js';
import Lesson from '../../models/lessonModel.js';
import User from '../../models/userModel.js';
import generateToken from '../../utils/generateToken.js';
import dotenv from 'dotenv';
import { jest } from '@jest/globals';

// Load environment variables
dotenv.config();

// Store the original models to restore after tests
const originalUserModel = mongoose.models.User;
const originalLessonModel = mongoose.models.Lesson;

// Use MongoDB Atlas for testing
const TEST_DB_URL = process.env.MONGO_URI.replace('brainymath', 'brainymath_test');

describe('Lesson API', () => {
    let adminToken;
    let userToken;
    let adminId;
    let userId;
    let testLesson;

    beforeAll(async () => {
        jest.setTimeout(60000); // Increase test timeout to 60 seconds
        
        // Only connect if not already connected
        if (mongoose.connection.readyState === 0) {
            try {
                await mongoose.connect(TEST_DB_URL, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    serverSelectionTimeoutMS: 5000,
                    socketTimeoutMS: 10000,
                    connectTimeoutMS: 5000,
                    maxPoolSize: 5,
                    minPoolSize: 1,
                });
            } catch (error) {
                console.error('Error connecting to test database:', error);
                throw error;
            }
        }
        
        try {
            // Clear all collections at the start
            await Promise.all([
                User.deleteMany({}),
                Lesson.deleteMany({})
            ]);
            console.log('Initial collections cleared');
        } catch (error) {
            console.error('Error in beforeAll:', error);
            throw error;
        }
    });

    beforeEach(async () => {
        try {
            // Clear all collections before each test
            await Promise.all([
                User.deleteMany({}),
                Lesson.deleteMany({})
            ]);

            // Create test users
            const admin = await User.create({
                name: 'Admin User',
                email: 'admin@example.com',
                password: 'password123',
                isAdmin: true
            });
            adminId = admin._id;
            adminToken = generateToken(adminId);

            const user = await User.create({
                name: 'Regular User',
                email: 'user@example.com',
                password: 'password123'
            });
            userId = user._id;
            userToken = generateToken(userId);

            // Create a test lesson
            testLesson = await Lesson.create({
                title: 'Test Lesson',
                description: 'A lesson for testing',
                content: 'This is the content of the test lesson',
                category: 'Algebra',
                difficulty: 'Beginner'
            });

        } catch (error) {
            console.error('Error in beforeEach:', error);
            throw error;
        }
    });

    afterAll(async () => {
        try {
            // Clear collections
            await Promise.all([
                User.deleteMany({}),
                Lesson.deleteMany({})
            ]);

            // Only disconnect if we're the last test suite running
            const activeSuites = global.jasmine?.currentEnv_?.topSuite().children().length;
            if (activeSuites === 1) {
                await mongoose.disconnect();
            }
            
            // Restore original models
            if (originalUserModel) mongoose.models.User = originalUserModel;
            if (originalLessonModel) mongoose.models.Lesson = originalLessonModel;
            
            console.log('Test database connection closed and models restored');
        } catch (error) {
            console.error('Error in afterAll:', error);
            throw error;
        }
    });

    describe('GET /api/lessons', () => {
        it('should get all lessons', async () => {
            const res = await request(app)
                .get('/api/lessons');

            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body.length).toBe(1);
            expect(res.body[0]).toHaveProperty('title', 'Test Lesson');
        });
    });

    describe('GET /api/lessons/:id', () => {
        it('should get lesson by id', async () => {
            const res = await request(app)
                .get(`/api/lessons/${testLesson._id}`);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('title', 'Test Lesson');
            expect(res.body).toHaveProperty('difficulty', 'Beginner');
        });

        it('should return 404 if lesson not found', async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const res = await request(app)
                .get(`/api/lessons/${fakeId}`);

            expect(res.status).toBe(404);
        });
    });

    describe('POST /api/lessons', () => {
        it('should create a new lesson if user is admin', async () => {
            const newLesson = {
                title: 'New Lesson',
                description: 'A new lesson for testing',
                content: 'This is the content of the new lesson',
                category: 'Geometry',
                difficulty: 'Intermediate'
            };

            const res = await request(app)
                .post('/api/lessons')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(newLesson);

            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('title', newLesson.title);
            expect(res.body).toHaveProperty('difficulty', newLesson.difficulty);
        });

        it('should not allow non-admin to create lesson', async () => {
            const newLesson = {
                title: 'New Lesson',
                description: 'A new lesson for testing',
                content: 'This is the content of the new lesson',
                category: 'Geometry',
                difficulty: 'Intermediate'
            };

            const res = await request(app)
                .post('/api/lessons')
                .set('Authorization', `Bearer ${userToken}`)
                .send(newLesson);

            expect(res.status).toBe(403);
        });

        it('should validate lesson data', async () => {
            const invalidLesson = {
                description: 'Missing title and invalid difficulty',
                difficulty: 'Invalid'
            };

            const res = await request(app)
                .post('/api/lessons')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(invalidLesson);

            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('errors');
        });
    });

    describe('PUT /api/lessons/:id', () => {
        it('should update lesson if user is admin', async () => {
            const updates = {
                title: 'Updated Lesson Title',
                difficulty: 'Advanced'
            };

            const res = await request(app)
                .put(`/api/lessons/${testLesson._id}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send(updates);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('title', updates.title);
            expect(res.body).toHaveProperty('difficulty', updates.difficulty);
        });

        it('should not allow non-admin to update lesson', async () => {
            const updates = {
                title: 'Updated Lesson Title'
            };

            const res = await request(app)
                .put(`/api/lessons/${testLesson._id}`)
                .set('Authorization', `Bearer ${userToken}`)
                .send(updates);

            expect(res.status).toBe(403);
        });

        it('should return 404 if lesson not found', async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const updates = {
                title: 'Updated Lesson Title'
            };

            const res = await request(app)
                .put(`/api/lessons/${fakeId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send(updates);

            expect(res.status).toBe(404);
        });
    });

    describe('DELETE /api/lessons/:id', () => {
        it('should delete lesson if user is admin', async () => {
            const res = await request(app)
                .delete(`/api/lessons/${testLesson._id}`)
                .set('Authorization', `Bearer ${adminToken}`);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('message', 'Lesson removed successfully');

            // Verify lesson is deleted
            const deletedLesson = await Lesson.findById(testLesson._id);
            expect(deletedLesson).toBeNull();
        });

        it('should not allow non-admin to delete lesson', async () => {
            const res = await request(app)
                .delete(`/api/lessons/${testLesson._id}`)
                .set('Authorization', `Bearer ${userToken}`);

            expect(res.status).toBe(403);
        });

        it('should return 404 if lesson not found', async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const res = await request(app)
                .delete(`/api/lessons/${fakeId}`)
                .set('Authorization', `Bearer ${adminToken}`);

            expect(res.status).toBe(404);
        });
    });
}); 