import mongoose from 'mongoose';

const classroomMembershipSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    classroom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Classroom',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

classroomMembershipSchema.index({ user: 1, classroom: 1 }, { unique: true });

const ClassroomMembership = mongoose.model('ClassroomMembership', classroomMembershipSchema);
export default ClassroomMembership;