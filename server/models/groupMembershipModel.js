import mongoose from 'mongoose';

const groupMembershipSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
  role: { type: String, enum: ['admin', 'member'], default: 'member' },
}, { timestamps: true });

groupMembershipSchema.index({ user: 1, group: 1 }, { unique: true });

export default mongoose.model('GroupMembership', groupMembershipSchema);
