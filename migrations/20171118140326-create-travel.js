'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Travels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fromLat: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      fromLon: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      toLat: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      toLon: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      vehicule: {
        type: Sequelize.STRING,
        isIn: [ [ 'DRIVING', 'WALKING', 'BICYCLING', 'TRANSIT' ] ],
        allowNull: false
      },
      comment: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Travels');
  }
};
