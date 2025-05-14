'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Courts', [
      {
        name: 'Central Padel Court',
        wall_type: 'acrylic',
        court_type: 'indoor',
        clubId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Courts', null, {});
  }
};

