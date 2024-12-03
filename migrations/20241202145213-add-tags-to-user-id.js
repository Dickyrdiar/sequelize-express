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

    const describeTable = await queryInterface.describeTable('Comments')

    if (!describeTable.userId) {
      await queryInterface.addColumn('Tags', 'userId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Tags',
          key: 'id'
        }, 
  
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }) 
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn('Tags', 'userId')
  }
};
