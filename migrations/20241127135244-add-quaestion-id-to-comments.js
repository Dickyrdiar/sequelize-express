'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    const tableCommentDescription = await queryInterface.describeTable('Comments')

    if (!tableCommentDescription.questionId) {
      await queryInterface.addColumn('Comments', 'questionId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Questions',
          key: 'id'
        }, 
  
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Comments', 'questionId')
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
