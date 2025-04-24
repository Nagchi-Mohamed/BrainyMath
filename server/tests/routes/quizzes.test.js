import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../index.js';
import Quiz from '../../models/quizModel.js';
import Question from '../../models/questionModel.js';
import QuizResult from '../../models/quizResultModel.js';
import User from '../../models/userModel.js';
import generateToken from '../../utils/generateToken.js';
import { jest } from '@jest/globals';

let server;

describe('Quiz API', () => {
    let testUser;
    let adminUser;
    let userToken;
    let adminToken;
    let testQuiz;
    let testQuestion;

    beforeAll(async () => {
        server = app.listen(0);
    });

    afterAll(async () => {
        if (server) {
            await new Promise(resolve => server.close(resolve));
        }
    });

    beforeEach(async () => {
        try {
            // Create test users
            testUser = await User.create({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123',
                isAdmin: false
            });

            adminUser = await User.create({
                name: 'Admin User',
                email: 'admin@example.com',
                password: 'password123',
                isAdmin: true
            });

            userToken = generateToken(testUser._id);
            adminToken = generateToken(adminUser._id);

            // Create a test quiz
            testQuiz = await Quiz.create({
                title: 'Test Quiz',
                description: 'A test quiz',
                difficulty: 'Beginner',
                questions: []
            });

            // Create a test question
            testQuestion = await Question.create({
                quiz: testQuiz._id,
                text: 'What is 2 + 2?',
                options: ['3', '4', '5', '6'],
                correctAnswerIndex: 1
            });
        } catch (error) {
            console.error('Error in beforeEach:', error);
        }
    });

    describe('GET /api/quizzes', () => {
        it('should get all quizzes', async () => {
            const response = await request(app)
                .get('/api/quizzes')
                .set('Authorization', `Bearer ${userToken}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe('GET /api/quizzes/:id', () => {
        it('should get quiz by id', async () => {
            const response = await request(app)
                .get(`/api/quizzes/${testQuiz._id}`)
                .set('Authorization', `Bearer ${userToken}`);

            expect(response.status).toBe(200);
            expect(response.body._id).toBe(testQuiz._id.toString());
        });

        it('should return 404 if quiz not found', async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const response = await request(app)
                .get(`/api/quizzes/${fakeId}`)
                .set('Authorization', `Bearer ${userToken}`);

            expect(response.status).toBe(404);
        });
    });

    describe('POST /api/quizzes', () => {
        it('should create a new quiz if user is admin', async () => {
            const newQuiz = {
                title: 'New Quiz',
                description: 'A new quiz',
                difficulty: 'Beginner'
            };

            const response = await request(app)
                .post('/api/quizzes')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(newQuiz);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('title', newQuiz.title);
            expect(response.body).toHaveProperty('difficulty', newQuiz.difficulty);
        });

        it('should not allow non-admin to create quiz', async () => {
            const newQuiz = {
                title: 'New Quiz',
                description: 'A new quiz',
                difficulty: 'Beginner'
            };

            const response = await request(app)
                .post('/api/quizzes')
                .set('Authorization', `Bearer ${userToken}`)
                .send(newQuiz);

            expect(response.status).toBe(403);
        });

        it('should validate quiz data', async () => {
            const invalidQuiz = {
                description: 'A new quiz',
                // Missing required title
            };

            const response = await request(app)
                .post('/api/quizzes')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(invalidQuiz);

            expect(response.status).toBe(400);
        });
    });

    describe('POST /api/quizzes/:quizId/questions', () => {
        it('should add a question to quiz if user is admin', async () => {
            const newQuestion = {
                text: 'What is 2 + 2?',
                options: ['3', '4', '5', '6'],
                correctAnswerIndex: 1
            };

            const response = await request(app)
                .post(`/api/quizzes/${testQuiz._id}/questions`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send(newQuestion);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('text', newQuestion.text);
            expect(response.body).toHaveProperty('options');
            expect(response.body.options).toHaveLength(4);
        });

        it('should validate question data', async () => {
            const invalidQuestion = {
                // Missing required text field
                options: [],
                correctAnswerIndex: -1
            };

            const response = await request(app)
                .post(`/api/quizzes/${testQuiz._id}/questions`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send(invalidQuestion);

            expect(response.status).toBe(400);
        });
    });

    describe('POST /api/quizzes/:quizId/submit', () => {
        it('should submit quiz answers and calculate score', async () => {
            const answers = [1]; // Correct answer for our test question

            const res = await request(app)
                .post(`/api/quizzes/${testQuiz._id}/submit`)
                .set('Authorization', `Bearer ${userToken}`)
                .send({ answers });

            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('score');
            expect(res.body).toHaveProperty('possibleScore');
        });

        it('should require authentication', async () => {
            const res = await request(app)
                .post(`/api/quizzes/${testQuiz._id}/submit`)
                .send({ answers: [] });

            expect(res.status).toBe(401);
        });
    });
}); 