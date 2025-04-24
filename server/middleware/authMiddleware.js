// backend/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import dotenv from 'dotenv';

dotenv.config();

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in Authorization header (Bearer token)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Get token from header
    token = req.headers.authorization.split(' ')[1];
  }

  // If no token found, return error
  if (!token) {
    res.status(401).json({ error: 'Not authorized, no token provided' });
    return;
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from the token payload (using the 'id' field we added)
    // Exclude the password field from the user object attached to req
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      res.status(401).json({ error: 'Not authorized, user not found' });
      return;
    }

    next(); // Proceed to the protected route
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({ error: 'Not authorized, token failed or expired' });
    return;
  }
});

// Middleware to check if the user is an admin
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next(); // User is admin, proceed
  } else {
    res.status(403).json({ error: 'Not authorized as admin' });
  }
};

export { protect, admin };
