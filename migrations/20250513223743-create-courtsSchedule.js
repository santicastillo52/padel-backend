'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CourtSchedules', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      day_of_week: {
        type: Sequelize.ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'),
        allowNull: false,
      },
      start_time: Sequelize.TIME,
      end_time: Sequelize.TIME,
      courtId: {
        type: Sequelize.INTEGER,
        references: { model: 'Courts', key: 'id' },
        onDelete: 'CASCADE',
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CourtSchedules');
  }
};

