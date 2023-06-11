const client = require("../client");

async function getRoutineActivityById(routineActivityId) {
  try {
    const {
      rows: [routineActivity],
    } = await client.query(
      `SELECT * 
      FROM routine_activities
      WHERE routine_id=$1;
      `,
      [routineActivityId]
    );
    return routineActivity;
  } catch (error) {
    throw error;
  }
}

async function addActivityToRoutine(routineId, activityId, count, duration) {
  try {
    const { rows } = await client.query(
      `
      INSERT INTO routine_activities(routine_id, activity_id, count, duration)
      VALUES($1, $2, $3, $4)
      RETURNING *;
      `,
      [routineId, activityId, count, duration]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function updateRoutineActivity(routineActivityId, count, duration) {
  try {
    const {
      rows: [routineActivity],
    } = await client.query(
      ` UPDATE routine_activities
        SET "count" = $2, "duration" =$3
        WHERE id= $1
        RETURNING *; 
      `,
      [routineActivityId, count, duration]
    );
    return routineActivity;
  } catch (error) {
    throw error;
  }
}

async function destroyRoutineActivity(routineActivityId) {
  try {
    const res = await client.query(
      `
      DELETE FROM routine_activities
      WHERE id=$1;
    `,
      [routineActivityId]
    );

    return true;
  } catch (error) {
    throw error;
  }
}

async function getRoutineActivitiesByRoutine(routineId) {
  try {
    const {
      rows: [routineActivity],
    } = await client.query(
      ` SELECT *
        FROM routine_activities
        WHERE routine_id = $1;
      `,
      [routineId]
    );
    return routineActivity;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  getRoutineActivitiesByRoutine,
};
