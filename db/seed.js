const client = require("./client");
const { createUser } = require("./adapters/users");

const {
  users,
  activities,
  routines,
  routine_activities,
} = require("./seedData");

async function dropTables() {
  // Drop all tables in order
  console.log("Dropping tables...");
  try {
    await client.query(`DROP TABLE IF EXISTS users;`);
  } catch (error) {
    console.log(error);
  }
}

async function createTables() {
  // Define your tables and fields
  console.log("Creating tables...");
  try {
    await client.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      )
    `);
  } catch (error) {
    console.log(error);
  }
}

async function populateTables() {
  // Seed tables with dummy data from seedData.js
  console.log("Populating tables...");
  try {
    for (const user of users) {
      const createdUser = await createUser(user);
      console.log("User: ", createdUser);
    }
  } catch (error) {
    console.log(error);
  }
}

async function rebuildDb() {
  client.connect();
  try {
    await dropTables();
    await createTables();
    await populateTables();
  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
}

rebuildDb();
