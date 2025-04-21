import express from 'express';
import { body } from 'express-validator';
import {
  listGroups,
  getGroupDetails,
  createGroup,
  joinGroup,
  leaveGroup,
  manageMember,
} from '../controllers/groupController.js';
import auth from '../middleware/auth.js';

const router = express.Router();
const protect = auth;

// List groups with optional search
router.get('/', listGroups);

// Get group details and members
router.get('/:id', getGroupDetails);

// Create a new group (protected)
router.post(
  '/',
  protect,
  [body('name').notEmpty().withMessage('Group name is required')],
  createGroup
);

// Join a group (protected)
router.post('/:id/join', protect, joinGroup);

// Leave a group (protected)
router.post('/:id/leave', protect, leaveGroup);

// Manage group members (promote/demote/remove) (protected)
router.put('/:groupId/members/:memberId', protect, manageMember);

export default router;
