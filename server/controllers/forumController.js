import asyncHandler from 'express-async-handler';
import ForumCategory from '../models/forumCategoryModel.js';
import ForumThread from '../models/forumThreadModel.js';
import ForumPost from '../models/forumPostModel.js';

// @desc    Get all forum categories
// @route   GET /api/forums/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await ForumCategory.find({}).sort({ createdAt: 1 });
  res.json(categories);
});

// @desc    Get threads in a category with pagination
// @route   GET /api/forums/categories/:categoryId/threads
// @access  Public
const getThreadsByCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const page = Number(req.query.page) || 1;
  const pageSize = 10;

  const count = await ForumThread.countDocuments({ category: categoryId });
  const threads = await ForumThread.find({ category: categoryId })
    .populate('user', 'username')
    .sort({ pinned: -1, createdAt: -1 })
    .skip(pageSize * (page - 1))
    .limit(pageSize);

  res.json({
    threads,
    page,
    pages: Math.ceil(count / pageSize),
  });
});

// @desc    Get posts in a thread with pagination
// @route   GET /api/forums/threads/:threadId/posts
// @access  Public
const getPostsByThread = asyncHandler(async (req, res) => {
  const { threadId } = req.params;
  const page = Number(req.query.page) || 1;
  const pageSize = 10;

  const count = await ForumPost.countDocuments({ thread: threadId });
  const posts = await ForumPost.find({ thread: threadId })
    .populate('user', 'username')
    .sort({ createdAt: 1 })
    .skip(pageSize * (page - 1))
    .limit(pageSize);

  res.json({
    posts,
    page,
    pages: Math.ceil(count / pageSize),
  });
});

// @desc    Create a new thread
// @route   POST /api/forums/categories/:categoryId/threads
// @access  Private
const createThread = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(400);
    throw new Error('Title and content are required');
  }

  const thread = new ForumThread({
    title,
    category: categoryId,
    user: req.user._id,
  });

  const createdThread = await thread.save();

  const post = new ForumPost({
    thread: createdThread._id,
    user: req.user._id,
    content,
  });

  await post.save();

  res.status(201).json(createdThread);
});

// @desc    Create a new post in a thread
// @route   POST /api/forums/threads/:threadId/posts
// @access  Private
const createPost = asyncHandler(async (req, res) => {
  const { threadId } = req.params;
  const { content } = req.body;

  if (!content) {
    res.status(400);
    throw new Error('Content is required');
  }

  const post = new ForumPost({
    thread: threadId,
    user: req.user._id,
    content,
  });

  const createdPost = await post.save();

  res.status(201).json(createdPost);
});

export {
  getCategories,
  getThreadsByCategory,
  getPostsByThread,
  createThread,
  createPost,
};
