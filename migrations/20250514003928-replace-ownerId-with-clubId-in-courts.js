'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Eliminar ownerId


    // 2. Agregar clubId
    await queryInterface.addColumn('Courts', 'clubId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Clubs',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    // Revertimos: sacamos clubId y volvemos a poner ownerId
    await queryInterface.removeColumn('Courts', 'clubId');

    await queryInterface.addColumn('Courts', 'ownerId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },
};
