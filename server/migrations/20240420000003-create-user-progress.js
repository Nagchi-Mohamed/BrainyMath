'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserProgress', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      lessonId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Lessons',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      status: {
        type: Sequelize.ENUM('not_started', 'in_progress', 'completed'),
        defaultValue: 'not_started'
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      lastAttemptedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      completedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    // Add indexes
    await queryInterface.addIndex('UserProgress', ['userId']);
    await queryInterface.addIndex('UserProgress', ['lessonId']);
    await queryInterface.addIndex('UserProgress', ['status']);
    await queryInterface.addIndex('UserProgress', ['userId', 'lessonId'], {
      unique: true,
      name: 'user_lesson_unique'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserProgress');
  }
}; 