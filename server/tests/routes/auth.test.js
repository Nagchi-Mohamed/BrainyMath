import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../server.js';
import User from '../../models/userModel.js';
import generateToken from '../../utils/generateToken.js';
import dotenv from 'dotenv';
import { jest } from '@jest/globals';

// Load environment variables
dotenv.config();

// Store the original model to restore it after tests
const originalUserModel = mongoose.models.User;

// Use MongoDB Atlas for testing
const TEST_DB_URL = 'mongodb://localhost:27017/brainymath_test';

describe('Auth API Routes', () => {
    let adminUser;
    let regularUser;
    let adminToken;
    let userToken;

    beforeAll(async () => {
        try {
            // Create test users
            adminUser = await User.create({
                name: 'Admin User',
                email: 'admin@test.com',
                password: 'password123',
                isAdmin: true
            });

            regularUser = await User.create({
                name: 'Regular User',
                email: 'user@test.com',
                password: 'password123',
                isAdmin: false
            });

            adminToken = generateToken(adminUser._id);
            userToken = generateToken(regularUser._id);

            // Clear User collection
            await User.deleteMany({});
            console.log('User collection cleared');
        } catch (error) {
            console.error('Error in beforeAll:', error);
            throw error;
        }
    });

    beforeEach(async () => {
        // Clear users collection before each test
        await User.deleteMany({});
    });

    afterAll(async () => {
        try {
            // Clear the User collection
            await User.deleteMany({});
        } catch (error) {
            console.error('Error in afterAll:', error);
            throw error;
        }
    });

    describe('POST /api/auth/register', () => {
        const newUser = {
            name: 'testuser',
            email: 'test@example.com',
            password: 'password123'
        };

        it('should register a new user successfully', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send(newUser);

            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('token');
            expect(res.body).toHaveProperty('user');
            expect(res.body.user).toHaveProperty('email', newUser.email);
            expect(res.body.user).toHaveProperty('name', newUser.name);
            expect(res.body.user).not.toHaveProperty('password');

            // Verify user exists in database
            const dbUser = await User.findOne({ email: newUser.email });
            expect(dbUser).toBeTruthy();
            expect(dbUser.email).toBe(newUser.email);
        });

        it('should not register a user with existing email', async () => {
            // First, create a user
            await request(app)
                .post('/api/auth/register')
                .send(newUser);

            // Then try to create another user with the same email
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    ...newUser,
                    name: 'differentname'
                });

            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('error');
            expect(res.body.error).toContain('email');
        });

        it('should not register a user with missing required fields', async () => {
            const incompleteUser = {
                email: 'test2@example.com',
                // Missing password
            };

            const res = await request(app)
                .post('/api/auth/register')
                .send(incompleteUser);

            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('errors');
            expect(res.body.errors).toContainEqual(
                expect.objectContaining({
                    msg: 'Password must be at least 6 characters'
                })
            );
        });
    });

    describe('POST /api/auth/login', () => {
        const loginCredentials = {
            email: 'test@example.com',
            password: 'password123'
        };

        beforeEach(async () => {
            // Create a user before each login test
            await request(app)
                .post('/api/auth/register')
                .send({
                    name: 'testuser',
                    ...loginCredentials
                });
        });

        it('should login user successfully', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send(loginCredentials);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('token');
            expect(res.body).toHaveProperty('user');
            expect(res.body.user).toHaveProperty('email', loginCredentials.email);
            expect(res.body.user).not.toHaveProperty('password');
        });

        it('should not login with incorrect password', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    ...loginCredentials,
                    password: 'wrongpassword'
                });

            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty('error');
            expect(res.body.error).toContain('Invalid email or password');
            expect(res.body).not.toHaveProperty('token');
        });

        it('should not login with non-existent email', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'nonexistent@example.com',
                    password: 'password123'
                });

            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty('error');
            expect(res.body.error).toContain('Invalid email or password');
            expect(res.body).not.toHaveProperty('token');
        });

        it('should not login with missing required fields', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'test@example.com'
                    // Missing password
                });

            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('errors');
            expect(res.body.errors).toContainEqual(
                expect.objectContaining({
                    msg: 'Password is required'
                })
            );
            expect(res.body).not.toHaveProperty('token');
        });
    });

    describe('GET /api/auth/profile', () => {
        let userToken;
        let userId;

        beforeEach(async () => {
            // Create a user and get token
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    name: 'testuser',
                    email: 'test@example.com',
                    password: 'password123'
                });
            userToken = res.body.token;
            userId = res.body.user._id;
        });

        it('should get user profile', async () => {
            const res = await request(app)
                .get('/api/auth/profile')
                .set('Authorization', `Bearer ${userToken}`);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('email', 'test@example.com');
            expect(res.body).toHaveProperty('name', 'testuser');
            expect(res.body).not.toHaveProperty('password');
        });

        it('should not get profile without auth token', async () => {
            const res = await request(app)
                .get('/api/auth/profile');

            expect(res.status).toBe(401);
        });
    });

    describe('PUT /api/auth/profile', () => {
        let userToken;
        let userId;

        beforeEach(async () => {
            // Create a user and get token
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    name: 'testuser',
                    email: 'test@example.com',
                    password: 'password123'
                });
            userToken = res.body.token;
            userId = res.body.user._id;
        });

        it('should update user profile', async () => {
            const res = await request(app)
                .put('/api/auth/profile')
                .set('Authorization', `Bearer ${userToken}`)
                .send({
                    name: 'updated name',
                    email: 'updated@example.com'
                });

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', 'updated name');
            expect(res.body).toHaveProperty('email', 'updated@example.com');
            expect(res.body).toHaveProperty('token');
        });

        it('should not update profile with short password', async () => {
            const res = await request(app)
                .put('/api/auth/profile')
                .set('Authorization', `Bearer ${userToken}`)
                .send({
                    name: 'Updated Name',
                    password: '12345'
                });

            expect(res.status).toBe(400);
            expect(res.body.error).toBe('Password must be at least 6 characters');
        });

        it('should not update profile with existing email', async () => {
            // Create another user first
            await request(app)
                .post('/api/auth/register')
                .send({
                    name: 'other user',
                    email: 'other@example.com',
                    password: 'password123'
                });

            const res = await request(app)
                .put('/api/auth/profile')
                .set('Authorization', `Bearer ${userToken}`)
                .send({
                    email: 'other@example.com'
                });

            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('error', 'Email already associated with another account.');
        });
    });

    describe('Admin Routes', () => {
        let adminToken;
        let regularUserToken;
        let regularUserId;

        beforeEach(async () => {
            // Create an admin user
            const adminUser = {
                name: 'admin',
                email: 'admin@example.com',
                password: 'password123',
                isAdmin: true
            };
            const adminRes = await request(app)
                .post('/api/auth/register')
                .send(adminUser);
            adminToken = adminRes.body.token;

            // Create a regular user
            const regularUser = {
                name: 'regular',
                email: 'regular@example.com',
                password: 'password123'
            };
            const regularRes = await request(app)
                .post('/api/auth/register')
                .send(regularUser);
            regularUserToken = regularRes.body.token;
            regularUserId = regularRes.body.user._id;
        });

        describe('GET /api/auth/users', () => {
            it('should get all users when admin', async () => {
                const res = await request(app)
                    .get('/api/auth/users')
                    .set('Authorization', `Bearer ${adminToken}`);

                expect(res.status).toBe(200);
                expect(Array.isArray(res.body)).toBe(true);
                expect(res.body.length).toBe(2); // admin and regular user
                expect(res.body[0]).toHaveProperty('email');
                expect(res.body[0]).toHaveProperty('name');
                expect(res.body[0]).not.toHaveProperty('password');
            });

            it('should not get users when not admin', async () => {
                const res = await request(app)
                    .get('/api/auth/users')
                    .set('Authorization', `Bearer ${regularUserToken}`);

                expect(res.status).toBe(403);
                expect(res.body).toHaveProperty('error');
                expect(res.body.error).toContain('Not authorized as admin');
            });

            it('should not get users without auth token', async () => {
                const res = await request(app)
                    .get('/api/auth/users');

                expect(res.status).toBe(401);
            });
        });

        describe('DELETE /api/auth/users/:id', () => {
            it('should delete user when admin', async () => {
                const res = await request(app)
                    .delete(`/api/auth/users/${regularUserId}`)
                    .set('Authorization', `Bearer ${adminToken}`);

                expect(res.status).toBe(200);
                expect(res.body).toHaveProperty('message', 'User removed');

                // Verify user is deleted
                const deletedUser = await User.findById(regularUserId);
                expect(deletedUser).toBeNull();
            });

            it('should not delete user when not admin', async () => {
                const res = await request(app)
                    .delete(`/api/auth/users/${regularUserId}`)
                    .set('Authorization', `Bearer ${regularUserToken}`);

                expect(res.status).toBe(403);
                expect(res.body).toHaveProperty('error');
                expect(res.body.error).toContain('Not authorized as admin');

                // Verify user still exists
                const user = await User.findById(regularUserId);
                expect(user).toBeTruthy();
            });

            it('should not delete user without auth token', async () => {
                const res = await request(app)
                    .delete(`/api/auth/users/${regularUserId}`);

                expect(res.status).toBe(401);

                // Verify user still exists
                const user = await User.findById(regularUserId);
                expect(user).toBeTruthy();
            });

            it('should return 404 when user not found', async () => {
                const nonExistentId = new mongoose.Types.ObjectId();
                const res = await request(app)
                    .delete(`/api/auth/users/${nonExistentId}`)
                    .set('Authorization', `Bearer ${adminToken}`);

                expect(res.status).toBe(404);
                expect(res.body).toHaveProperty('error');
                expect(res.body.error).toContain('User not found');
            });
        });
    });
});
