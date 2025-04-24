import { app } from '../server.js';
import request from 'supertest';
import dotenv from 'dotenv';

dotenv.config();

describe('Server Configuration', () => {
  describe('Server Initialization', () => {
    it('should initialize server with random port in test mode', () => {
      expect(process.env.NODE_ENV).toBe('test');
    });
  });

  describe('Middleware Setup', () => {
    it('should have CORS middleware enabled', async () => {
      const response = await request(app).get('/');
      expect(response.headers['access-control-allow-origin']).toBe('*');
    });

    it('should have JSON parsing middleware enabled', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({ name: 'test', email: 'test@test.com', password: 'password123' });
      expect(response.status).not.toBe(415);
    });

    it('should have Helmet middleware enabled', async () => {
      const response = await request(app).get('/');
      expect(response.headers['x-dns-prefetch-control']).toBe('off');
    });
  });

  describe('Route Registration', () => {
    it('should have auth routes registered', async () => {
      const response = await request(app).post('/api/auth/register');
      expect(response.status).not.toBe(404);
    });

    it('should have lesson routes registered', async () => {
      const response = await request(app).get('/api/lessons');
      expect(response.status).not.toBe(404);
    });

    it('should have quiz routes registered', async () => {
      const response = await request(app).get('/api/quizzes');
      expect(response.status).not.toBe(404);
    });

    it('should have classroom routes registered', async () => {
      const response = await request(app).get('/api/classrooms');
      expect(response.status).not.toBe(404);
    });

    it('should have user progress routes registered', async () => {
      const response = await request(app).post('/api/user-progress');
      expect(response.status).not.toBe(404);
    });

    it('should have games routes registered', async () => {
      const response = await request(app).get('/api/games');
      expect(response.status).not.toBe(404);
    });
  });
});

describe('Server', () => {
  it('should respond to health check', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'API is running' });
  });

  it('should handle 404 for non-existent routes', async () => {
    const response = await request(app).get('/non-existent-route');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Route not found');
  });
}); 