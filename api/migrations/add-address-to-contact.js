'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('contacts', 'address', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.renameColumn('phones', 'name', 'phone_type');
    await queryInterface.renameColumn('phones', 'number', 'phone_number');
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('contacts', 'address');
    //await queryInterface.renameColumn('phones', 'phone_type', 'name');
    //await queryInterface.renameColumn('phones', 'phone_number', 'number');
  }
};
