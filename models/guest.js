"use strict";

module.exports = function(sequelize, DataTypes) {
  var guest = sequelize.define('guest', {
  id: {type: DataTypes.STRING,primaryKey: true},
  fridge: DataTypes.STRING
},{
  freezeTableName: true,
  timestamps: false
})
  return guest
}
