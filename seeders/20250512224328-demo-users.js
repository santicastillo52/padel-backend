'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Users', [
      {
        name: 'Admin Owner',
        email: 'admin@example.com',
        password: 'hashed_password_here',
        role: 'admin',
        position: 'both',
        
      },
      {
        name: 'Padel Player',
        email: 'player@example.com',
        password: 'hashed_password_here',
        role: 'client',
        position: 'backhand',
      
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     * 
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
