'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  var review = sequelize.define('Review', {
    name: DataTypes.STRING,
    review: DataTypes.TEXT,
    file: DataTypes.STRING
  })
  review.associate = function(models) {
    review.belongsTo(models.Location);
    review.belongsTo(models.User);

  }

  return review;
};
