'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'level', {
      type: Sequelize.INTEGER,
      allowNull: true, // Permitimos null para usuarios existentes
      validate: {
        min: 1,
        max: 8
      },
      defaultValue: 1 // Valor por defecto para nuevos usuarios
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'level');
  }
}; 