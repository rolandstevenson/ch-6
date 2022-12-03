"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "superadmin@gmail.com",
          password: await bcrypt.hash("12345", 10),
          role: "superadmin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "admin@gmail.com",
          password: await bcrypt.hash("12345", 10),
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "user@gmail.com",
          password: await bcrypt.hash("12345", 10),
          role: "member",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
