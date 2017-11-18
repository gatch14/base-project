'use strict';
module.exports = (sequelize, DataTypes) => {
  var Travel = sequelize.define('Travel', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fromLat: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    fromLon: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    toLat: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    toLon: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    vehicule: {
      type: DataTypes.STRING,
      isIn: [ [ 'DRIVING', 'WALKING', 'BICYCLING', 'TRANSIT' ] ],
      allowNull: false
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Travel;
};
