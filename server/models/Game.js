import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Game = sequelize.define('Game', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 100]
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('quiz', 'puzzle', 'challenge', 'interactive'),
    allowNull: false
  },
  difficulty: {
    type: DataTypes.ENUM('beginner', 'intermediate', 'advanced'),
    defaultValue: 'beginner'
  },
  content: {
    type: DataTypes.JSONB,
    allowNull: false
  },
  rules: {
    type: DataTypes.JSONB,
    allowNull: false
  },
  scoring: {
    type: DataTypes.JSONB,
    allowNull: false
  },
  timeLimit: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  metadata: {
    type: DataTypes.JSONB,
    defaultValue: {}
  }
}, {
  timestamps: true,
  indexes: [
    { fields: ['type'] },
    { fields: ['difficulty'] },
    { fields: ['isPublished'] }
  ]
});

export default Game;
