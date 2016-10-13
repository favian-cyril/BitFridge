var sequelize = require('../app').sequelize;

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('guest', {
  id:{type: DataTypes.STRING,primaryKey: true},
  frige: DataTypes.TEXT
})}
