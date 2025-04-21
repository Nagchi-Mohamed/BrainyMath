import ForumCategory from '../models/forumCategoryModel.js';
import ForumThread from '../models/forumThreadModel.js';
import ForumPost from '../models/forumPostModel.js';

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await ForumCategory.find({});
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching categories' });
  }
};

// Get threads by category with pagination
export const getThreadsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const threads = await ForumThread.find({ category: categoryId })
      .sort({ lastReply: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user', 'name email');

    const count = await ForumThread.countDocuments({ category: categoryId });

    res.json({ threads, page, pages: Math.ceil(count / limit) });
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching threads' });
  }
};

// Get posts by thread with pagination
export const getPostsByThread = async (req, res) => {
  try {
    const { threadId } = req.params;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await ForumPost.find({ thread: threadId })
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(limit)
      .populate('user', 'name email');

    const count = await ForumPost.countDocuments({ thread: threadId });

    res.json({ posts, page, pages: Math.ceil(count / limit) });
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching posts' });
  }
};

// Create a new thread
export const createThread = async (req, res) => {
  try {
    const userId = req.user.id;
    const { categoryId } = req.params;
    const { title, content } = req.body;

    const thread = new ForumThread({
      title,
      content,
      user: userId,
      category: categoryId,
      lastReply: Date.now(),
      postsCount: 0,
    });

    const createdThread = await thread.save();

    res.status(201).json(createdThread);
  } catch (error) {
    res.status(500).json({ message: 'Server error creating thread' });
  }
};

// Create a new post
export const createPost = async (req, res) => {
  try {
    const userId = req.user.id;
    const { threadId } = req.params;
    const { content } = req.body;

    const post = new ForumPost({
      content,
      user: userId,
      thread: threadId,
    });

    const createdPost = await post.save();

    // Update thread's postsCount and lastReply
    await ForumThread.findByIdAndUpdate(threadId, {
      $inc: { postsCount: 1 },
      lastReply: Date.now(),
    });

    res.status(201).json(createdPost);
  } catch (error) {
    res.status(500).json({ message: 'Server error creating post' });
  }
};
