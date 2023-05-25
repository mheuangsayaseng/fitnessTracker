const client = require("../client");

async function createRoutine({ creator_id, is_public, name, goal }) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
        INSERT INTO routines(creator_id, is_public, name, goal)
        VALUES($1, $2, $3, $4)
        ON CONFLICT (name) DO NOTHING
        RETURNING *;
    `,
      [creator_id, is_public, name, goal]
    );
    return routine;
  } catch (error) {
    console.log(error);
  }
}

async function getAllRoutines() {
  try {
    const { rows } = await client.query(
      `
        SELECT * FROM routines
    `
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function getRoutineById({routineId})
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
      SELECT creator_id, is_public, name, goal
      FROM routines
      WHERE id=${routineId}
      `);
      if (!routine) {
        return null;
      
      return routine;
    } catch (error) {
      throw error;
    }


module.exports = { createRoutine };
