// backend/controllers/authController.js
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import { validationResult } from 'express-validator';

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  // 1. Validation Check (using express-validator)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map(error => ({
      msg: error.msg === 'Password must be 6 or more characters' 
        ? 'Password must be at least 6 characters' 
        : error.msg,
      path: error.path,
      location: error.location,
      type: error.type
    }));
    return res.status(400).json({ errors: formattedErrors });
  }

  const { name, email, password, isAdmin } = req.body;

  // 2. Check if user already exists
  const userExists = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });

  if (userExists) {
    return res.status(400).json({ error: 'User with this email already exists' });
  }

  // 3. Create new user (password hashing handled by model pre-save hook)
  const user = await User.create({
    name,
    email,
    password,
    isAdmin: isAdmin || false
  });

  // 4. Respond with user data and token
  if (user) {
    return res.status(201).json({
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      }
    });
  } else {
    return res.status(400).json({ error: 'Invalid user data' });
  }
});

// @desc    Authenticate user & get token (Login)
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });

  if (user && (await user.matchPassword(password))) {
    return res.json({
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      }
    });
  } else {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private (requires token)
const getUserProfile = asyncHandler(async (req, res) => {
  const user = req.user;

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array();
    // If there's a password error, return it in the expected format
    const passwordError = formattedErrors.find(error => error.path === 'password');
    if (passwordError) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }
    return res.status(400).json({ errors: formattedErrors });
  }

  const user = await User.findById(req.user._id);

  if (user) {
    // Check if email is being updated and if it's already in use
    if (req.body.email && req.body.email !== user.email) {
      const emailExists = await User.findOne({ email: req.body.email }).collation({ locale: 'en', strength: 2 });
      if (emailExists) {
        return res.status(400).json({ error: 'Email already associated with another account.' });
      }
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    
    if (req.body.password) {
      if (req.body.password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' });
      }
      user.password = req.body.password;
    }

    try {
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
      });
    } catch (error) {
      res.status(400).json({ error: error.message || 'Could not update profile' });
    }
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// --- Admin Controllers ---

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password');
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin && req.user._id.equals(user._id)) {
      return res.status(400).json({ error: 'Cannot delete admin account' });
    }
    await user.deleteOne();
    res.json({ message: 'User removed' });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

export {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
};
