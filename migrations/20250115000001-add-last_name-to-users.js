'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'last_name', {
      type: Sequelize.STRING,
      allowNull: true, // Permitimos null para usuarios existentes
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'last_name');
  }
}; 