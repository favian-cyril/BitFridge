"use strict";

module.exports = function(sequelize, DataTypes) {
  var Guest = sequelize.define('guest', {
  id:{type: DataTypes.STRING,primaryKey: true},
  frige: DataTypes.TEXT
  })
  return Guest
}
