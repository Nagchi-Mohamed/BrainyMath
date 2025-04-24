import mongoose from 'mongoose';

const forumPostSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    thread: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ForumThread',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ForumPost = mongoose.model('ForumPost', forumPostSchema);

export default ForumPost;
