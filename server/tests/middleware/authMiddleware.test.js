import { jest } from '@jest/globals';
import jwt from 'jsonwebtoken';
import { protect, admin } from '../../middleware/authMiddleware.js';
import User from '../../models/userModel.js';

// Manual mock for User model
const mockUser = {
  findById: jest.fn().mockImplementation((id) => ({
    select: jest.fn().mockImplementation(() => {
      if (id === '123') {
        return Promise.resolve({
          _id: '123',
          email: 'test@example.com',
          isAdmin: false
        });
      }
      return Promise.resolve(null);
    })
  }))
};

// Override the User model in the middleware
jest.spyOn(User, 'findById').mockImplementation(mockUser.findById);

describe('Auth Middleware', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      headers: {},
      user: null
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  describe('protect middleware', () => {
    it('should return 401 if no token is provided', async () => {
      await protect(req, res, next);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Not authorized, no token provided' });
    });

    it('should return 401 if token is invalid', async () => {
      req.headers.authorization = 'Bearer invalid-token';
      await protect(req, res, next);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Not authorized, token failed or expired' });
    });

    it('should set user in request if token is valid', async () => {
      const token = jwt.sign({ id: '123' }, process.env.JWT_SECRET || 'test-secret');
      req.headers.authorization = `Bearer ${token}`;
      await protect(req, res, next);
      expect(req.user).toBeDefined();
      expect(next).toHaveBeenCalled();
    });
  });

  describe('admin middleware', () => {
    it('should return 403 if user is not admin', async () => {
      req.user = { isAdmin: false };
      await admin(req, res, next);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ error: 'Not authorized as admin' });
    });

    it('should call next if user is admin', async () => {
      req.user = { isAdmin: true };
      await admin(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });
}); 