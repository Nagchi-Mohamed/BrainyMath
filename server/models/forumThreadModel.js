import mongoose from 'mongoose';

const forumThreadSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ForumCategory',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ForumThread = mongoose.model('ForumThread', forumThreadSchema);

export default ForumThread;
