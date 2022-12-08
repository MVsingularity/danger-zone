'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  var Location = sequelize.define('Location', {
    title: DataTypes.STRING,
    desc: DataTypes.TEXT,
    imgUrl: DataTypes.STRING
  })

  Location.associate = function(models) {
    Location.hasMany(models.Review);
  }
  return Location;
};
