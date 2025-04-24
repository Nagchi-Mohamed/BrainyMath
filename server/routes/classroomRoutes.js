import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { check } from 'express-validator';
import {
  getAllClassrooms,
  getClassroomById,
  createClassroom,
  updateClassroom,
  deleteClassroom,
  joinClassroom,
  leaveClassroom,
  getClassroomMembers,
} from '../controllers/classroomController.js';

const router = express.Router();

// Validation middleware
const createClassroomValidation = [
  check('name', 'Name is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
];

// All routes are protected
router.use(protect);

// Get all classrooms
router.get('/', getAllClassrooms);

// Get a classroom by ID
router.get('/:id', getClassroomById);

// Create a new classroom
router.post('/', createClassroomValidation, createClassroom);

// Update a classroom
router.put('/:id', updateClassroom);

// Delete a classroom
router.delete('/:id', deleteClassroom);

// Member-related routes
router.post('/:id/members', joinClassroom);
router.delete('/:id/members/me', leaveClassroom);
router.get('/:id/members', getClassroomMembers);

export default router;