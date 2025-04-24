import request from 'supertest';
import mongoose from 'mongoose';
import { app, server } from '../../server.js';
import Classroom from '../../models/classroomModel.js';
import User from '../../models/userModel.js';
import ClassroomMembership from '../../models/classroomMembershipModel.js';
import generateToken from '../../utils/generateToken.js';
import dotenv from 'dotenv';
import { jest } from '@jest/globals';

// Load environment variables
dotenv.config();

// Store the original models to restore them after tests
const originalUserModel = mongoose.models.User;
const originalClassroomModel = mongoose.models.Classroom;
const originalClassroomMembershipModel = mongoose.models.ClassroomMembership;

// Use MongoDB Atlas for testing with proper error handling
const TEST_DB_URL = process.env.MONGO_URI.replace('brainymath', 'brainymath_test');

describe('Classroom API Routes', () => {
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
        Classroom.deleteMany({}),
        ClassroomMembership.deleteMany({}),
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
        Classroom.deleteMany({}),
        ClassroomMembership.deleteMany({}),
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
        Classroom.deleteMany({}),
        ClassroomMembership.deleteMany({}),
      ]);
      // Close the database connection
      await mongoose.connection.close();
      // Close the server
      await new Promise((resolve) => server.close(resolve));
      // Restore the original models
      if (originalUserModel) {
        mongoose.models.User = originalUserModel;
      }
      if (originalClassroomModel) {
        mongoose.models.Classroom = originalClassroomModel;
      }
      if (originalClassroomMembershipModel) {
        mongoose.models.ClassroomMembership = originalClassroomMembershipModel;
      }
      console.log('Test database connection closed and models restored');
    } catch (error) {
      console.error('Error in afterAll:', error);
    }
  });

  let token;
  let userId;
  let testUser;
  let otherUser;
  let otherUserToken;

  beforeEach(async () => {
    try {
      // Create test users before each test
      testUser = await User.create({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123',
      });
      userId = testUser._id;
      token = generateToken(userId);

      otherUser = await User.create({
        name: 'Other User',
        email: 'otheruser@example.com',
        password: 'password123',
      });
      otherUserToken = generateToken(otherUser._id);
    } catch (error) {
      console.error('Error in beforeEach:', error);
      throw error;
    }
  });

  describe('POST /api/classrooms', () => {
    it('should create a new classroom with valid data and auth', async () => {
      const res = await request(app)
        .post('/api/classrooms')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Math 101',
          description: 'Basic math classroom',
        });
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.name).toBe('Math 101');
      expect(res.body.createdBy).toBe(userId.toString());
    });

    it('should return 400 if name is missing', async () => {
      const res = await request(app)
        .post('/api/classrooms')
        .set('Authorization', `Bearer ${token}`)
        .send({
          description: 'No name classroom',
        });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('errors');
      expect(res.body.errors[0].msg).toBe('Name is required');
    });

    it('should return 401 if no auth token provided', async () => {
      const res = await request(app)
        .post('/api/classrooms')
        .send({
          name: 'Unauthorized Classroom',
        });
      expect(res.status).toBe(401);
    });
  });

  describe('GET /api/classrooms', () => {
    it('should get all classrooms', async () => {
      // Create test classrooms
      await Classroom.create({
        name: 'Classroom 1',
        createdBy: userId,
        description: 'Test classroom 1',
      });
      await Classroom.create({
        name: 'Classroom 2',
        createdBy: userId,
        description: 'Test classroom 2',
      });

      const res = await request(app)
        .get('/api/classrooms')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(2);
      expect(res.body[0]).toHaveProperty('name');
      expect(res.body[0]).toHaveProperty('createdBy');
    });
  });

  describe('GET /api/classrooms/:id', () => {
    it('should get classroom by id', async () => {
      const classroom = await Classroom.create({
        name: 'Classroom Get',
        createdBy: userId,
        description: 'Test classroom',
      });

      const res = await request(app)
        .get(`/api/classrooms/${classroom._id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Classroom Get');
      expect(res.body.createdBy).toBe(userId.toString());
    });

    it('should return 404 if classroom not found', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .get(`/api/classrooms/${fakeId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(404);
    });
  });

  describe('PUT /api/classrooms/:id', () => {
    it('should update classroom if user is creator', async () => {
      const classroom = await Classroom.create({
        name: 'Old Name',
        createdBy: userId,
        description: 'Test classroom',
      });

      const res = await request(app)
        .put(`/api/classrooms/${classroom._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'New Name',
          description: 'Updated description',
        });

      expect(res.status).toBe(200);
      expect(res.body.name).toBe('New Name');
      expect(res.body.description).toBe('Updated description');
    });

    it('should return 403 if user is not creator', async () => {
      // Create another user
      const otherUser = await User.create({
        name: 'Other User',
        email: 'other@example.com',
        password: 'password123',
      });

      // Create classroom with other user
      const classroom = await Classroom.create({
        name: 'Classroom',
        createdBy: otherUser._id,
        description: 'Test classroom',
      });

      const res = await request(app)
        .put(`/api/classrooms/${classroom._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Attempted Update' });

      expect(res.status).toBe(403);
    });

    it('should return 404 if classroom not found', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .put(`/api/classrooms/${fakeId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'New Name' });

      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /api/classrooms/:id', () => {
    it('should delete classroom if user is creator', async () => {
      const classroom = await Classroom.create({
        name: 'To Delete',
        createdBy: userId,
        description: 'Test classroom',
      });

      const res = await request(app)
        .delete(`/api/classrooms/${classroom._id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Classroom deleted successfully');

      // Verify classroom is deleted
      const deletedClassroom = await Classroom.findById(classroom._id);
      expect(deletedClassroom).toBeNull();
    });

    it('should return 403 if user is not creator', async () => {
      // Create another user
      const otherUser = await User.create({
        name: 'Other User',
        email: 'other@example.com',
        password: 'password123',
      });

      // Create classroom with other user
      const classroom = await Classroom.create({
        name: 'Classroom',
        createdBy: otherUser._id,
        description: 'Test classroom',
      });

      const res = await request(app)
        .delete(`/api/classrooms/${classroom._id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(403);
    });

    it('should return 404 if classroom not found', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .delete(`/api/classrooms/${fakeId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(404);
    });
  });

  describe('POST /api/classrooms/:id/members', () => {
    it('should allow a user to join a classroom', async () => {
      // Create a classroom first
      const classroom = await Classroom.create({
        name: 'Join Test Classroom',
        description: 'Test classroom for joining',
        createdBy: otherUser._id,
      });

      const res = await request(app)
        .post(`/api/classrooms/${classroom._id}/members`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Joined classroom successfully');

      // Verify membership was created
      const membership = await ClassroomMembership.findOne({
        user: testUser._id,
        classroom: classroom._id,
      });
      expect(membership).toBeTruthy();
    });

    it('should not allow joining a non-existent classroom', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .post(`/api/classrooms/${fakeId}/members`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(404);
    });

    it('should not allow joining the same classroom twice', async () => {
      // Create a classroom
      const classroom = await Classroom.create({
        name: 'Double Join Test',
        description: 'Test classroom for double joining',
        createdBy: otherUser._id,
      });

      // Join first time
      await ClassroomMembership.create({
        classroom: classroom._id,
        user: testUser._id,
      });

      // Try to join again
      const res = await request(app)
        .post(`/api/classrooms/${classroom._id}/members`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Already a member of this classroom');
    });
  });

  describe('DELETE /api/classrooms/:id/members/me', () => {
    it('should allow a user to leave a classroom', async () => {
      // Create a classroom
      const classroom = await Classroom.create({
        name: 'Leave Test Classroom',
        description: 'Test classroom for leaving',
        createdBy: otherUser._id,
      });

      // Join the classroom first
      await ClassroomMembership.create({
        classroom: classroom._id,
        user: testUser._id,
      });

      const res = await request(app)
        .delete(`/api/classrooms/${classroom._id}/members/me`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Left classroom successfully');

      // Verify membership was deleted
      const membership = await ClassroomMembership.findOne({
        user: testUser._id,
        classroom: classroom._id,
      });
      expect(membership).toBeNull();
    });

    it('should return 404 when trying to leave a classroom user is not a member of', async () => {
      const classroom = await Classroom.create({
        name: 'Not Member Classroom',
        description: 'Test classroom for non-member leaving',
        createdBy: otherUser._id,
      });

      const res = await request(app)
        .delete(`/api/classrooms/${classroom._id}/members/me`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(404);
    });
  });

  describe('GET /api/classrooms/:id/members', () => {
    it('should get all members of a classroom', async () => {
      // Create a classroom
      const classroom = await Classroom.create({
        name: 'Members Test Classroom',
        description: 'Test classroom for getting members',
        createdBy: otherUser._id,
      });

      // Add both users as members
      await ClassroomMembership.create({
        user: testUser._id,
        classroom: classroom._id,
      });
      await ClassroomMembership.create({
        user: otherUser._id,
        classroom: classroom._id,
      });

      const res = await request(app)
        .get(`/api/classrooms/${classroom._id}/members`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(2);
      expect(res.body[0]).toHaveProperty('user');
      expect(res.body[0].user).toHaveProperty('name');
      expect(res.body[0].user).toHaveProperty('email');
    });

    it('should return empty array for classroom with no members', async () => {
      const classroom = await Classroom.create({
        name: 'Empty Classroom',
        description: 'Test classroom with no members',
        createdBy: otherUser._id,
      });

      const res = await request(app)
        .get(`/api/classrooms/${classroom._id}/members`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(0);
    });

    it('should return 404 for non-existent classroom', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .get(`/api/classrooms/${fakeId}/members`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(404);
    });
  });
});
