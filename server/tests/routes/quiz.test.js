import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../index.js';
import Quiz from '../../models/quizModel.js';
import Question from '../../models/questionModel.js';
import User from '../../models/User.js';
import generateToken from '../../utils/generateToken.js';

let server;
let adminToken, userToken;
let adminUser, normalUser;
let quizId;

beforeAll(async () => {
  server = app.listen(0);
});

afterAll(async () => {
  if (server) {
    await new Promise(resolve => server.close(resolve));
    console.log('Test server closed for quizzes');
  }
});

beforeEach(async () => {  
  // Create test users
  adminUser = await User.create({
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123',
    isAdmin: true,
  });
  
  normalUser = await User.create({
    name: 'Normal User',
    email: 'user@example.com',
    password: 'password123',
    isAdmin: false,
  });
  
  // Generate tokens
  adminToken = generateToken(adminUser._id);
  userToken = generateToken(normalUser._id);

  // Create a sample quiz
  const quiz = await Quiz.create({
    title: 'Sample Quiz',
    description: 'A sample quiz for testing',
    difficulty: 'Beginner',
    createdBy: adminUser._id,
  });
  quizId = quiz._id;
});

describe('Quiz API', () => {
  describe('GET /api/quizzes', () => {
    it('should get all quizzes', async () => {
      const res = await request(app)
        .get('/api/quizzes')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('GET /api/quizzes/:id', () => {
    it('should get quiz by id', async () => {
      const res = await request(app)
        .get(`/api/quizzes/${quizId}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(200);
      expect(res.body.title).toBe('Sample Quiz');
    });

    it('should return 404 if quiz not found', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .get(`/api/quizzes/${fakeId}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(404);
    });
  });

  describe('POST /api/quizzes', () => {
    it('should create a new quiz if admin', async () => {
      const res = await request(app)
        .post('/api/quizzes')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'New Quiz',
          description: 'New quiz description',
          difficulty: 'Beginner',
        });

      expect(res.status).toBe(201);
      expect(res.body.title).toBe('New Quiz');
    });

    it('should not allow non-admin to create quiz', async () => {
      const res = await request(app)
        .post('/api/quizzes')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          title: 'Unauthorized Quiz',
          description: 'Should not be created',
          difficulty: 'Beginner',
        });

      expect(res.status).toBe(403);
    });

    it('should return 400 if title is missing', async () => {
      const res = await request(app)
        .post('/api/quizzes')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          description: 'Missing title',
          difficulty: 'Beginner',
        });

      expect(res.status).toBe(400);
    });
  });

  describe('PUT /api/quizzes/:id', () => {
    it('should update quiz if admin', async () => {
      const res = await request(app)
        .put(`/api/quizzes/${quizId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'Updated Quiz Title',
          difficulty: 'Beginner',
        });

      expect(res.status).toBe(200);
      expect(res.body.title).toBe('Updated Quiz Title');
    });

    it('should not allow non-admin to update quiz', async () => {
      const res = await request(app)
        .put(`/api/quizzes/${quizId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          title: 'Attempted Update',
          difficulty: 'Beginner',
        });

      expect(res.status).toBe(403);
    });

    it('should return 404 if quiz not found', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .put(`/api/quizzes/${fakeId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'Non-existent Quiz',
          difficulty: 'Beginner',
        });

      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /api/quizzes/:id', () => {
    it('should delete quiz if admin', async () => {
      const res = await request(app)
        .delete(`/api/quizzes/${quizId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.message).toMatch(/deleted successfully/i);
    });

    it('should not allow non-admin to delete quiz', async () => {
      const res = await request(app)
        .delete(`/api/quizzes/${quizId}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(403);
    });

    it('should return 404 if quiz not found', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .delete(`/api/quizzes/${fakeId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(404);
    });
  });

  describe('POST /api/quizzes/:quizId/questions', () => {
    it('should add a question to quiz if admin', async () => {
      const res = await request(app)
        .post(`/api/quizzes/${quizId}/questions`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          text: 'What is 2 + 2?',
          options: ['1', '2', '3', '4'],
          correctAnswerIndex: 3,
        });

      expect(res.status).toBe(201);
      expect(res.body.text).toBe('What is 2 + 2?');
    });

    it('should not allow non-admin to add question', async () => {
      const res = await request(app)
        .post(`/api/quizzes/${quizId}/questions`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          text: 'Unauthorized question',
          options: ['a', 'b', 'c', 'd'],
          correctAnswerIndex: 0,
        });

      expect(res.status).toBe(403);
    });

    it('should return 400 if question data is invalid', async () => {
      const res = await request(app)
        .post(`/api/quizzes/${quizId}/questions`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          text: '',
          options: [],
          correctAnswerIndex: -1,
        });

      expect(res.status).toBe(400);
    });
  });

  describe('POST /api/quizzes/:quizId/submit', () => {
    it('should submit quiz answers and calculate score', async () => {
      // Add a question first
      await request(app)
        .post(`/api/quizzes/${quizId}/questions`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          text: 'What is 3 + 3?',
          options: ['3', '4', '5', '6'],
          correctAnswerIndex: 3,
        });

      const res = await request(app)
        .post(`/api/quizzes/${quizId}/submit`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          answers: [3],
        });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('score');
      expect(typeof res.body.score).toBe('number');
    });

    it('should handle incorrect answers', async () => {
      await request(app)
        .post(`/api/quizzes/${quizId}/questions`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          text: 'What is 5 + 5?',
          options: ['8', '9', '10', '11'],
          correctAnswerIndex: 2,
        });

      const res = await request(app)
        .post(`/api/quizzes/${quizId}/submit`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          answers: [1],
        });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('score');
    });

    it('should require authentication', async () => {
      const res = await request(app)
        .post(`/api/quizzes/${quizId}/submit`)
        .send({
          answers: [],
        });

      expect(res.status).toBe(401);
    });
  });
});
