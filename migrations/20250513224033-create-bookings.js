'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      date: { type: Sequelize.DATEONLY, allowNull: false },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE',
      },
      courtId: {
        type: Sequelize.INTEGER,
        references: { model: 'Courts', key: 'id' },
        onDelete: 'CASCADE',
      },
      courtScheduleId: {
        type: Sequelize.INTEGER,
        references: { model: 'CourtSchedules', key: 'id' },
        onDelete: 'CASCADE',
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
  }
};
