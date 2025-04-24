import asyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import Group from '../models/groupModel.js';
import GroupMembership from '../models/groupMembershipModel.js';

// @desc    Get all groups
// @route   GET /api/groups
// @access  Private
export const getAllGroups = asyncHandler(async (req, res) => {
  const groups = await Group.find({}).populate('creator', 'name email');
  res.json(groups);
});

// @desc    Get group by ID
// @route   GET /api/groups/:id
// @access  Private
export const getGroupById = asyncHandler(async (req, res) => {
  const group = await Group.findById(req.params.id)
    .populate('creator', 'name email')
    .populate('members', 'name email');

  if (group) {
    res.json(group);
  } else {
    res.status(404);
    throw new Error('Group not found');
  }
});

// @desc    Create a new group
// @route   POST /api/groups
// @access  Private/Admin
export const createGroup = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    res.status(400);
    throw new Error('Please provide name and description');
  }

  const group = new Group({
    name,
    description,
    creator: req.user._id,
    members: [req.user._id],
  });

  const createdGroup = await group.save();
  res.status(201).json(createdGroup);
});

// @desc    Join a group
// @route   POST /api/groups/:groupId/join
// @access  Private
export const joinGroup = asyncHandler(async (req, res) => {
  const group = await Group.findById(req.params.groupId);
  if (!group) {
    res.status(404);
    throw new Error('Group not found');
  }

  const existingMembership = await GroupMembership.findOne({
    user: req.user._id,
    group: req.params.groupId,
  });

  if (existingMembership) {
    res.status(400);
    throw new Error('Already a member of this group');
  }

  await GroupMembership.create({
    user: req.user._id,
    group: req.params.groupId,
  });

  res.status(200).json({ message: 'Successfully joined the group' });
});

// @desc    Leave a group
// @route   DELETE /api/groups/:groupId/leave
// @access  Private
export const leaveGroup = asyncHandler(async (req, res) => {
  const membership = await GroupMembership.findOne({
    user: req.user._id,
    group: req.params.groupId,
  });

  if (!membership) {
    res.status(404);
    throw new Error('Not a member of this group');
  }

  const group = await Group.findById(req.params.groupId);
  if (group.owner.toString() === req.user._id.toString()) {
    res.status(400);
    throw new Error('Group owner cannot leave the group');
  }

  await membership.remove();
  res.status(200).json({ message: 'Successfully left the group' });
});

// @desc    Get group members
// @route   GET /api/groups/:groupId/members
// @access  Private
export const getGroupMembers = asyncHandler(async (req, res) => {
  const memberships = await GroupMembership.find({ group: req.params.groupId }).populate('user', 'name email');
  res.status(200).json(memberships);
});

// @desc    Remove a group member
// @route   DELETE /api/groups/:groupId/members/:userId
// @access  Private (Admin/Owner only)
export const removeGroupMember = asyncHandler(async (req, res) => {
  const { groupId, userId } = req.params;

  const requesterMembership = await GroupMembership.findOne({
    user: req.user._id,
    group: groupId,
  });

  if (!requesterMembership || requesterMembership.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to remove members');
  }

  const targetMembership = await GroupMembership.findOne({
    user: userId,
    group: groupId,
  });

  if (!targetMembership) {
    res.status(404);
    throw new Error('Member not found');
  }

  await targetMembership.remove();
  res.status(200).json({ message: 'Member removed successfully' });
});

// @desc    Promote a group member
// @route   POST /api/groups/:groupId/members/:userId/promote
// @access  Private (Admin/Owner only)
export const promoteGroupMember = asyncHandler(async (req, res) => {
  const { groupId, userId } = req.params;

  const requesterMembership = await GroupMembership.findOne({
    user: req.user._id,
    group: groupId,
  });

  if (!requesterMembership || requesterMembership.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to promote members');
  }

  const targetMembership = await GroupMembership.findOne({
    user: userId,
    group: groupId,
  });

  if (!targetMembership) {
    res.status(404);
    throw new Error('Member not found');
  }

  targetMembership.role = 'admin';
  await targetMembership.save();

  res.status(200).json({ message: 'Member promoted to admin successfully' });
}
);
