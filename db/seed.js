const client = require("./client");

const {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
} = require("./adapters/users");

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
    await client.query(
      `
        DROP TABLE IF EXISTS routine_activities;
        DROP TABLE IF EXISTS routines;
        DROP TABLE IF EXISTS activities;
        DROP TABLE IF EXISTS users;
      `
    );
  } catch (error) {
    console.error("Error Dropping Table!");
    throw error;
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
      );

      CREATE TABLE routines(
        id SERIAL PRIMARY KEY,
        creator_id INTEGER REFERENCES users(id),
        is_public BOOLEAN DEFAULT false,
        name VARCHAR(255) UNIQUE NOT NULL,
        goal TEXT NOT NULL
      );

      CREATE TABLE activities(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NOT NULL
      );

      CREATE TABLE routine_activities(
        id SERIAL PRIMARY KEY,
        routine_id INTEGER UNIQUE REFERENCES routines (id),
        activity_id INTEGER UNIQUE REFERENCES activities (id),
        duration INTEGER,
        count INTEGER
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
