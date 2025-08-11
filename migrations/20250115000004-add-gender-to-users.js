'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'gender', {
      type: Sequelize.ENUM('male', 'female', 'unspecified'),
      allowNull: false,
      defaultValue: 'male'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'gender');
    // También eliminamos el tipo ENUM personalizado
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Users_gender";');
  }
};
