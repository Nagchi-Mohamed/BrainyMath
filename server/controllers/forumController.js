import asyncHandler from 'express-async-handler';
import ForumCategory from '../models/forumCategoryModel.js';
import ForumThread from '../models/forumThreadModel.js';
import ForumPost from '../models/forumPostModel.js';

export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const categoryExists = await ForumCategory.findOne({ name });
  if (categoryExists) {
    res.status(400);
    throw new Error('Category already exists');
  }
  const category = await ForumCategory.create({ name });
  res.status(201).json(category);
});

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await ForumCategory.find({});
  res.json(categories);
});

export const getThreadsByCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const threads = await ForumThread.find({ category: categoryId });
  res.json(threads);
});

export const createThread = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const { title, content } = req.body;
  const thread = await ForumThread.create({
    category: categoryId,
    title,
    content,
    user: req.user._id,
  });
  res.status(201).json(thread);
});

export const getPostsByThread = asyncHandler(async (req, res) => {
  const { threadId } = req.params;
  const posts = await ForumPost.find({ thread: threadId });
  res.json(posts);
});

export const createPost = asyncHandler(async (req, res) => {
  const { threadId } = req.params;
  const { content } = req.body;
  const post = await ForumPost.create({
    thread: threadId,
    content,
    user: req.user._id,
  });
  res.status(201).json(post);
});

export const updateThread = asyncHandler(async (req, res) => {
  const { threadId } = req.params;
  const thread = await ForumThread.findById(threadId);
  if (!thread) {
    res.status(404);
    throw new Error('Thread not found');
  }
  if (thread.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
    res.status(403);
    throw new Error('Not authorized to update this thread');
  }
  thread.title = req.body.title || thread.title;
  thread.content = req.body.content || thread.content;
  const updatedThread = await thread.save();
  res.json(updatedThread);
});

export const deleteThread = asyncHandler(async (req, res) => {
  const { threadId } = req.params;
  const thread = await ForumThread.findById(threadId);
  if (!thread) {
    res.status(404);
    throw new Error('Thread not found');
  }
  if (thread.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
    res.status(403);
    throw new Error('Not authorized to delete this thread');
  }
  await thread.remove();
  res.json({ message: 'Thread removed' });
});

export const updatePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const post = await ForumPost.findById(postId);
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }
  if (post.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
    res.status(403);
    throw new Error('Not authorized to update this post');
  }
  post.content = req.body.content || post.content;
  const updatedPost = await post.save();
  res.json(updatedPost);
});

export const deletePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const post = await ForumPost.findById(postId);
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }
  if (post.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
    res.status(403);
    throw new Error('Not authorized to delete this post');
  }
  await post.remove();
  res.json({ message: 'Post removed' });
});
