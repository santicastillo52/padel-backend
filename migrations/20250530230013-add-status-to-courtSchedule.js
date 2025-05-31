'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('CourtSchedules', 'status', {
      type: Sequelize.ENUM('available', 'booked', 'maintenance'),
      allowNull: false,
      defaultValue: 'available',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('CourtSchedules', 'status');
  }
};
