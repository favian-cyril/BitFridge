'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface
      .createTable('guest', {
      id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
      fridge: Sequelize.STRING
    });
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('guest')
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
