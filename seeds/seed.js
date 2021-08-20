const seedComments = require("./comment-seeds");
const seedPosts = require("./post-seeds");
const seedUsers = require("./user-seeds");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");

  await seedUsers();
  console.log("\n----- Users SEEDED -----\n");

  await seedPosts();
  console.log("\n----- Posts SEEDED -----\n");

  await seedComments();
  console.log("\n----- Comments SEEDED -----\n");

  process.exit(0);
};

seedAll();
