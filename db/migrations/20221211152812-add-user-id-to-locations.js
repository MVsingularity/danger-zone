'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Locations',
      'UserId', // name of key we are adding
      {
        type: Sequelize.INTEGER,
        references: { //Required field
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Locations', 'UserId');
  }
