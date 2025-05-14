'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bookings', [
      {
        date: '2025-05-13',
        userId: 2, // cliente
        courtId: 1,
        courtScheduleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', null, {});
  }
};

