'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     * 
     */
    const tableDescription = await queryInterface.describeTable('Comments');

    if (!tableDescription.userId) {
      await queryInterface.addColumn('Comments', 'userId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
  
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Comments', 'userId')
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */


  }
};
