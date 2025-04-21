import mongoose from 'mongoose';

const forumCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, default: '' },
  },
  { timestamps: true }
);

const ForumCategory = mongoose.model('ForumCategory', forumCategorySchema);

export default ForumCategory;
