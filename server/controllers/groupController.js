import asyncHandler from 'express-async-handler';
import Group from '../models/groupModel.js';
import GroupMembership from '../models/groupMembershipModel.js';

// @desc    List all groups with optional search
// @route   GET /api/groups
// @access  Public
const listGroups = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: { $regex: req.query.keyword, $options: 'i' },
      }
    : {};

  const groups = await Group.find({ ...keyword }).sort({ createdAt: -1 });
  res.json(groups);
});

// @desc    Get group details including members
// @route   GET /api/groups/:id
// @access  Public
const getGroupDetails = asyncHandler(async (req, res) => {
  const group = await Group.findById(req.params.id);
  if (!group) {
    res.status(404);
    throw new Error('Group not found');
  }

  const members = await GroupMembership.find({ group: group._id }).populate('user', 'username email');
  res.json({ group, members });
});

// @desc    Create a new group
// @route   POST /api/groups
// @access  Private
const createGroup = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    res.status(400);
    throw new Error('Group name is required');
  }

  const existingGroup = await Group.findOne({ name });
  if (existingGroup) {
    res.status(400);
    throw new Error('Group name already exists');
  }

  const group = new Group({
    name,
    description,
    owner: req.user._id,
  });

  const createdGroup = await group.save();

  // Add owner as admin member
  const membership = new GroupMembership({
    user: req.user._id,
    group: createdGroup._id,
    role: 'admin',
  });
  await membership.save();

  res.status(201).json(createdGroup);
});

// @desc    Join a group
// @route   POST /api/groups/:id/join
// @access  Private
const joinGroup = asyncHandler(async (req, res) => {
  const groupId = req.params.id;
  const userId = req.user._id;

  const group = await Group.findById(groupId);
  if (!group) {
    res.status(404);
    throw new Error('Group not found');
  }

  const existingMembership = await GroupMembership.findOne({ group: groupId, user: userId });
  if (existingMembership) {
    res.status(400);
    throw new Error('Already a member of this group');
  }

  const membership = new GroupMembership({
    user: userId,
    group: groupId,
    role: 'member',
  });

  await membership.save();

  res.status(201).json({ message: 'Joined group successfully' });
});

// @desc    Leave a group
// @route   POST /api/groups/:id/leave
// @access  Private
const leaveGroup = asyncHandler(async (req, res) => {
  const groupId = req.params.id;
  const userId = req.user._id;

  const membership = await GroupMembership.findOne({ group: groupId, user: userId });
  if (!membership) {
    res.status(400);
    throw new Error('Not a member of this group');
  }

  // Prevent owner from leaving group
  const group = await Group.findById(groupId);
  if (group.owner.toString() === userId.toString()) {
    res.status(400);
    throw new Error('Group owner cannot leave the group');
  }

  await membership.remove();

  res.json({ message: 'Left group successfully' });
});

// @desc    Manage group members (promote/demote/remove)
// @route   PUT /api/groups/:groupId/members/:memberId
// @access  Private (admin only)
const manageMember = asyncHandler(async (req, res) => {
  const { groupId, memberId } = req.params;
  const { action, role } = req.body; // action: 'promote', 'demote', 'remove'

  const group = await Group.findById(groupId);
  if (!group) {
    res.status(404);
    throw new Error('Group not found');
  }

  // Check if requester is admin
  const requesterMembership = await GroupMembership.findOne({ group: groupId, user: req.user._id });
  if (!requesterMembership || requesterMembership.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized');
  }

  const memberMembership = await GroupMembership.findOne({ group: groupId, user: memberId });
  if (!memberMembership) {
    res.status(404);
    throw new Error('Member not found in group');
  }

  if (action === 'remove') {
    // Prevent removing owner
    if (memberId === group.owner.toString()) {
      res.status(400);
      throw new Error('Cannot remove group owner');
    }
    await memberMembership.remove();
    res.json({ message: 'Member removed' });
  } else if (action === 'promote' && role === 'admin') {
    memberMembership.role = 'admin';
    await memberMembership.save();
    res.json({ message: 'Member promoted to admin' });
  } else if (action === 'demote' && role === 'member') {
    // Prevent demoting owner
    if (memberId === group.owner.toString()) {
      res.status(400);
      throw new Error('Cannot demote group owner');
    }
    memberMembership.role = 'member';
    await memberMembership.save();
    res.json({ message: 'Member demoted to member' });
  } else {
    res.status(400);
    throw new Error('Invalid action or role');
  }
});

export {
  listGroups,
  getGroupDetails,
  createGroup,
  joinGroup,
  leaveGroup,
  manageMember,
};
