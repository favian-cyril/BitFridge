'use strict';

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('guest', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    fridge: DataTypes.TEXT('long')
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  )
}
