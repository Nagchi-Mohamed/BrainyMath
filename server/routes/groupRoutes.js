import express from 'express';
import { body } from 'express-validator';
import {
  getAllGroups,
  getGroupById,
  createGroup,
  joinGroup,
  leaveGroup,
  getGroupMembers,
  removeGroupMember,
  promoteGroupMember,
} from '../controllers/groupController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getAllGroups);

router.route('/').post(
  protect,
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
  ],
  createGroup
);

router.route('/:groupId').get(protect, getGroupById);

router.route('/:groupId/join').post(protect, joinGroup);

router.route('/:groupId/leave').delete(protect, leaveGroup);

router.route('/:groupId/members').get(protect, getGroupMembers);

router.route('/:groupId/members/:userId').delete(protect, removeGroupMember);

router.route('/:groupId/members/:userId/promote').post(protect, promoteGroupMember);

export default router;
