import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../index.js';
import User from '../../models/userModel.js';
import Game from '../../models/gameModel.js';
import generateToken from '../../utils/generateToken.js';

let server;

describe('Game API Routes', () => {
  let testUser;
  let authToken;

  beforeAll(async () => {
    server = app.listen(0);
  });

  afterAll(async () => {
    if (server) {
      await new Promise(resolve => server.close(resolve));
    }
  });

  beforeEach(async () => {
    // Create test user
    testUser = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      isAdmin: false
    });
    authToken = generateToken(testUser._id);
  });

  describe('POST /api/games', () => {
    it('should create a new game', async () => {
      const gameData = {
        score: 100,
        timeSpent: 60,
        mistakes: 2,
        gameType: 'addition'
      };

      const response = await request(app)
        .post('/api/games')
        .set('Authorization', `Bearer ${authToken}`)
        .send(gameData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('_id');
      expect(response.body.score).toBe(gameData.score);
      expect(response.body.timeSpent).toBe(gameData.timeSpent);
      expect(response.body.mistakes).toBe(gameData.mistakes);
      expect(response.body.gameType).toBe(gameData.gameType);
      expect(response.body.user.toString()).toBe(testUser._id.toString());
    });

    it('should not create a game without auth token', async () => {
      const gameData = {
        score: 100,
        timeSpent: 60,
        mistakes: 2,
        gameType: 'addition'
      };

      const response = await request(app)
        .post('/api/games')
        .send(gameData);

      expect(response.status).toBe(401);
    });

    it('should validate game input', async () => {
      const gameData = {
        score: -1,
        timeSpent: 60,
        mistakes: 2,
        gameType: 'addition'
      };

      const response = await request(app)
        .post('/api/games')
        .set('Authorization', `Bearer ${authToken}`)
        .send(gameData);

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/games', () => {
    beforeEach(async () => {
      // Create some test games
      await Game.create([
        {
          user: testUser._id,
          score: 100,
          timeSpent: 60,
          mistakes: 2,
          gameType: 'addition'
        },
        {
          user: testUser._id,
          score: 90,
          timeSpent: 45,
          mistakes: 1,
          gameType: 'subtraction'
        }
      ]);
    });

    it('should get all games for the user', async () => {
      const response = await request(app)
        .get('/api/games')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(2);
    });

    it('should not get games without auth token', async () => {
      const response = await request(app)
        .get('/api/games');

      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/games/:id', () => {
    let testGame;

    beforeEach(async () => {
      testGame = await Game.create({
        user: testUser._id,
        score: 100,
        timeSpent: 60,
        mistakes: 2,
        gameType: 'addition'
      });
    });

    it('should get game by id', async () => {
      const response = await request(app)
        .get(`/api/games/${testGame._id}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body._id).toBe(testGame._id.toString());
    });

    it('should return 404 if game not found', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .get(`/api/games/${fakeId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(404);
    });

    it('should not get game without auth token', async () => {
      const response = await request(app)
        .get(`/api/games/${testGame._id}`);

      expect(response.status).toBe(401);
    });
  });
}); 