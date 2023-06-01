const client = require("../client");

async function createActivities(name, description) {
  try {
    const {
      rows: [row],
    } = await client.query(
      `
      INSERT INTO activities(name, description)
      VALES ($1, $2)
      ON CONFLICT (name) DO NOTHING
      RETURNING *;
      `,
      [name, description]
    );
    return row;
  } catch (error) {
    throw error;
  }
}

async function getAllActivities() {
  try {
    const { rows } = await client.query(
      `
      SELECT *
      FROM activities;`
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAllActivitiesById(id) {
  try {
    const { rows } = await client.query(
      `
      SELECT * FROM activities
      WHERE id=$1
      `,
      [id]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function updateActivity(activityId, name, description) {
  try {
    const {
      rows: [activity],
    } = await client.query(
      `
      UPDATE activities
      SET "name" =$2, "description" =$3
      WHERE id=$1
      RETURNING *;
      `,
      [activityId, name, description]
    );
    return activity;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createActivities,
  getAllActivities,
  getAllActivitiesById,
  updateActivity,
};
