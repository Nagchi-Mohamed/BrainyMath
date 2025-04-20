const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class UserProgress extends Model {}

UserProgress.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  lessonId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Lessons',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.ENUM('not_started', 'in_progress', 'completed'),
    defaultValue: 'not_started'
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  lastAttemptedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  completedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'UserProgress',
  tableName: 'UserProgress',
  timestamps: true,
  indexes: [
    {
      fields: ['userId']
    },
    {
      fields: ['lessonId']
    },
    {
      fields: ['status']
    },
    {
      fields: ['userId', 'lessonId'],
      unique: true,
      name: 'user_lesson_unique'
    }
  ]
});

module.exports = UserProgress; 