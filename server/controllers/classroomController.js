import asyncHandler from 'express-async-handler';
import Classroom from '../models/classroomModel.js';
import ClassroomMembership from '../models/classroomMembershipModel.js';
import { validationResult } from 'express-validator';

// @desc    Get all classrooms
// @route   GET /api/classrooms
// @access  Private
const getAllClassrooms = asyncHandler(async (req, res) => {
  const classrooms = await Classroom.find({});
  res.status(200).json(classrooms);
});

// @desc    Get a classroom by ID
// @route   GET /api/classrooms/:id
// @access  Private
const getClassroomById = asyncHandler(async (req, res) => {
  const classroom = await Classroom.findById(req.params.id);

  if (!classroom) {
    res.status(404);
    throw new Error('Classroom not found');
  }

  res.status(200).json(classroom);
});

// @desc    Create a new classroom
// @route   POST /api/classrooms
// @access  Private
const createClassroom = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, description } = req.body;

  const classroom = await Classroom.create({
    name,
    description,
    createdBy: req.user._id,
  });

  res.status(201).json(classroom);
});

// @desc    Join a classroom
// @route   POST /api/classrooms/:id/members
// @access  Private (Requires Auth)
const joinClassroom = asyncHandler(async (req, res) => {
  const classroom = await Classroom.findById(req.params.id);

  if (!classroom) {
    return res.status(404).json({ error: 'Classroom not found' });
  }

  // Check if user is already a member
  const existingMembership = await ClassroomMembership.findOne({
    classroom: classroom._id,
    user: req.user._id,
  });

  if (existingMembership) {
    return res.status(400).json({ error: 'Already a member of this classroom' });
  }

  await ClassroomMembership.create({
    classroom: classroom._id,
    user: req.user._id,
  });

  res.status(200).json({ message: 'Joined classroom successfully' });
});

// @desc    Leave a classroom
// @route   DELETE /api/classrooms/:id/members/me
// @access  Private (Requires Auth)
const leaveClassroom = asyncHandler(async (req, res) => {
  const classroom = await Classroom.findById(req.params.id);

  if (!classroom) {
    res.status(404);
    throw new Error('Classroom not found');
  }

  const membership = await ClassroomMembership.findOneAndDelete({
    classroom: req.params.id,
    user: req.user._id,
  });

  if (!membership) {
    res.status(404);
    throw new Error('Not a member of this classroom');
  }

  res.status(200).json({ message: 'Left classroom successfully' });
});

// @desc    Get members of a classroom
// @route   GET /api/classrooms/:id/members
// @access  Private
const getClassroomMembers = asyncHandler(async (req, res) => {
  const classroom = await Classroom.findById(req.params.id);

  if (!classroom) {
    res.status(404);
    throw new Error('Classroom not found');
  }

  const members = await ClassroomMembership.find({ classroom: req.params.id }).populate('user', 'name email');
  res.status(200).json(members);
});

// @desc    Update a classroom
// @route   PUT /api/classrooms/:id
// @access  Private
const updateClassroom = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const classroom = await Classroom.findById(req.params.id);

  if (!classroom) {
    res.status(404);
    throw new Error('Classroom not found');
  }

  if (classroom.createdBy.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this classroom');
  }

  classroom.name = name || classroom.name;
  classroom.description = description || classroom.description;

  const updatedClassroom = await classroom.save();
  res.status(200).json(updatedClassroom);
});

// @desc    Delete a classroom
// @route   DELETE /api/classrooms/:id
// @access  Private
const deleteClassroom = asyncHandler(async (req, res) => {
  const classroom = await Classroom.findById(req.params.id);

  if (!classroom) {
    res.status(404);
    throw new Error('Classroom not found');
  }

  if (classroom.createdBy.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to delete this classroom');
  }

  await classroom.deleteOne();
  res.status(200).json({ message: 'Classroom deleted successfully' });
});

export {
  getAllClassrooms,
  getClassroomById,
  createClassroom,
  joinClassroom,
  leaveClassroom,
  getClassroomMembers,
  updateClassroom,
  deleteClassroom,
};