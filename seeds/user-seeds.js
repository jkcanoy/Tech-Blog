const { User } = require("../models");

const userData = [
  {
    username: "tina_belcher",
    email: "jimmyjrsgf@gmail.com",
    password: "password",
  },
  {
    username: "gene_belcher",
    email: "bestcalves@gmail.com",
    password: "password",
  },
  {
    username: "louise_belcher",
    email: "kuchikopi@gmail.com",
    password: "password",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
