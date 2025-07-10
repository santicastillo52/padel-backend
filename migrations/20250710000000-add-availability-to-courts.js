'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Courts', 'available', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true // Por defecto, todas las canchas existentes estarán disponibles
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Courts', 'available');
  }
};
