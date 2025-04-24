// Import Jest separately
import { jest } from '@jest/globals';

// Import dependencies
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import { validateRequest, validateObjectId, validateGameInput } from '../../middleware/validationMiddleware.js';

// Mock dependencies before importing modules
jest.mock('express-validator', () => {
  return {
    validationResult: jest.fn()
  };
});

// Mock mongoose.Types.ObjectId.isValid
jest.mock('mongoose', () => {
  return {
    Types: {
      ObjectId: {
        isValid: jest.fn()
      }
    }
  };
});

describe('Validation Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Setup mock request, response, next
    req = {
      params: {},
      body: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    next = jest.fn();
  });

  describe('validateRequest', () => {
    it('should call next() when there are no validation errors', () => {
      validationResult.mockReturnValue({
        isEmpty: () => true
      });

      validateRequest(req, res, next);

      expect(validationResult).toHaveBeenCalledWith(req);
      expect(next).toHaveBeenCalled();
    });

    it('should return 400 status with errors when validation fails', () => {
      const errors = [{ msg: 'Test error' }];
      validationResult.mockReturnValue({
        isEmpty: () => false,
        array: () => errors
      });

      validateRequest(req, res, next);

      expect(validationResult).toHaveBeenCalledWith(req);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ errors: errors });
    });
  });

  describe('validateObjectId', () => {
    it('should call next() when ID is valid', () => {
      req.params.id = '507f1f77bcf86cd799439011';
      mongoose.Types.ObjectId.isValid.mockReturnValue(true);

      const middleware = validateObjectId('id');
      middleware(req, res, next);

      expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
      expect(next).toHaveBeenCalled();
    });

    it('should return 400 status when ID is invalid', () => {
      req.params.id = 'invalid-id';
      mongoose.Types.ObjectId.isValid.mockReturnValue(false);

      const middleware = validateObjectId('id');
      middleware(req, res, next);

      expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith('invalid-id');
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid ID format for parameter: id' });
    });
  });

  describe('validateGameInput', () => {
    it('should call next() with valid game input', () => {
      req.body = {
        score: 10,
        timeSpent: 20,
        mistakes: 1,
        gameType: 'addition'
      };

      validateGameInput(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it('should return 400 status when score is negative', () => {
      req.body = {
        score: -1,
        timeSpent: 20,
        mistakes: 1,
        gameType: 'addition'
      };

      validateGameInput(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Score must be a non-negative number' });
    });

    it('should return 400 status when timeSpent is negative', () => {
      req.body = {
        score: 10,
        timeSpent: -1,
        mistakes: 1,
        gameType: 'addition'
      };

      validateGameInput(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Time spent must be a non-negative number' });
    });

    it('should return 400 status when mistakes is negative', () => {
      req.body = {
        score: 10,
        timeSpent: 20,
        mistakes: -1,
        gameType: 'addition'
      };

      validateGameInput(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Mistakes must be a non-negative number' });
    });

    it('should return 400 status when gameType is invalid', () => {
      req.body = {
        score: 10,
        timeSpent: 20,
        mistakes: 1,
        gameType: 'invalid'
      };

      validateGameInput(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid game type' });
    });

    it('should return 400 status when gameType is missing', () => {
      req.body = {
        score: 10,
        timeSpent: 20,
        mistakes: 1
      };

      validateGameInput(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid game type' });
    });
  });
});
