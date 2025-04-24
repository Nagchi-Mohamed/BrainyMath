import mongoose from 'mongoose';

const classroomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson',
    },
  },
  {
    timestamps: true,
  }
);

const Classroom = mongoose.model('Classroom', classroomSchema);
export default Classroom;