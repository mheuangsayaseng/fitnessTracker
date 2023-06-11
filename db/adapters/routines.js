const client = require("../client");

async function createRoutine({ creator_id, is_public, name, goal }) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
        INSERT INTO routine(creator_id, is_public, name, goal)
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
        SELECT
          routines.id as id,
          routines.name as name,
          routines.goal as goal,
          CASE WHEN routine_activities.routines_id IS NULL THEN '[]'::json
          ELSE
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', activities.id,
              'name', activities.name,
              'description', activities.description,
              'duration', routine_activities.duration,
              'count', routine_activities.count
            )
          ) END AS activities
          FROM routines
          FULL OUT JOIN routine_activities
          ON routines.id = routine_activities.routine_id
          FULL OUTER JOIN activities
          ON activities.id = routine_activities.activity_id
          GROUP BY routines.id, routine_activities.routine_id
    `
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function getRoutineById(id) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
      SELECT 
        routines.id as id,
        routines.name as name,
        routines.goal as goal,
        CASE WHEN routine_activities.routine_id IS NULL THEN '[]'::json
        ELSE
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'id', activities.id,
            'name', activities.name,
            'description', activities.description,
            'count', routine_activities.count,
          )
        ) END AS activities
        FROM routines
        JOIN routine_activities 
        ON routines.id = routine_activities.routine_id
        JOIN activities
        ON activities.id = routine_activities.activity_id
        WHERE routines.id = $1
        GROUP BY routines.id, routine_activities.routine_id
      `[id]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAllPublicRoutines() {
  try {
    const { rows } = await client.query(`
    SELECT 
      routines.id as id,
      routines.name as name,
      routines.goal as goal,
      CASE WHEN routine_activities.routine_id IS NULL THEN '[]'::json
      ELSE
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'id', activities.id,
          'name', activities.name,
          'description', activities.description,
          'duration', routine_activities.duration,
          'count', routine_activities.count
          
        )
      ) END AS activities
      FROM routines
      FULL OUTER JOIN routine_activities 
      ON routines.id = routine_activities.routine_id
      FULL OUTER JOIN activities
      ON activities.id = routine_activities.activity_id
      WHERE routines.is_public = true
      GROUP BY routines.id, routine_activities.routine_id
    `);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function getAllRoutinesByUser(username) {
  const { rows } = await client.query(
    `
    SELECT 
      routines.id as id,
      routines.name as name,
      routines.goal as goal,
      CASE WHEN routine_activities.routine_id IS NULL THEN '[]'::json
      ELSE
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'id', activities.id,
          'name', activities.name,
          'description', activities.description,
          'duration', routine_activities.duration,
          'count', routine_activities.count
          
        )
      ) END AS activities
      FROM routines
      JOIN users 
      ON routines.creator_id = users.id
      FULL OUTER JOIN routine_activities 
      ON routines.id = routine_activities.routine_id
      FULL OUTER JOIN activities
      ON activities.id = routine_activities.activity_id
      WHERE users.username = $1 
      GROUP BY routines.id, routine_activities.routine_id
    `,
    [username]
  );
  return rows;
}

async function getRoutinesWithoutActivities() {
  const {
    rows: [routine],
  } = await client.query(
    `SELECT * 
    FROM routines ;
    `
  );
  return routine;
}

async function getPublicRoutinesByUser(username) {
  try {
    const { rows } = await client.query(
      `
      SELECT 
        routines.id as id,
        routines.name as name,
        routines.goal as goal,
        CASE WHEN routine_activities.routine_id IS NULL THEN '[]'::json
        ELSE
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'id', activities.id,
            'name', activities.name,
            'description', activities.description,
            'duration', routine_activities.duration,
            'count', routine_activities.count
            
          )
        ) END AS activities
        FROM routines
        JOIN users 
        ON routines.creator_id = users.id
        FULL OUTER JOIN routine_activities 
        ON routines.id = routine_activities.routine_id
        FULL OUTER JOIN activities
        ON activities.id = routine_activities.activity_id
        WHERE users.username = $1 AND routines.is_public = true
        GROUP BY routines.id, routine_activities.routine_id
      `,
      [username]
    );
    return rows;
  } catch (error) {
    console.error(error);
  }
}

async function getRoutinesWithoutActivities() {
  const {
    rows: [routine],
  } = await client.query(
    `SELECT * 
    FROM routines ;
    `
  );
  return routine;
}

async function getPublicRoutinesByActivity(activityId) {
  const { rows } = await client.query(
    `
    SELECT 
      routines.id as id,
      routines.name as name,
      routines.goal as goal,
      CASE WHEN routine_activities.routine_id IS NULL THEN '[]'::json
      ELSE
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'id', activities.id,
          'name', activities.name,
          'description', activities.description,
          'duration', routine_activities.duration,
          'count', routine_activities.count
          
        )
      ) END AS activities
      FROM routines
      JOIN users 
      ON routines.creator_id = users.id
      FULL OUTER JOIN routine_activities 
      ON routines.id = routine_activities.routine_id
      FULL OUTER JOIN activities
      ON activities.id = routine_activities.activity_id
      WHERE activities.id = $1 AND routines.is_public = true
      GROUP BY routines.id, routine_activities.routine_id
    `,
    [activityId]
  );
  return rows;
}

async function updateRoutine(routineId, creator_id, is_public, name, goal) {
  try {
    const {
      rows: [updatedRoutine],
    } = await client.query(
      `UPDATE routines
      SET creator_id = $2, is_public = $3, name = $4, goal = $5 
      WHERE  id = $1
    `,
      [routineId, creator_id, is_public, name, goal]
    );
    return updatedRoutine;
  } catch (error) {
    throw error;
  }
}

async function destroyRoutine(routineId) {
  const { rows } = await client.query(
    `
    DELETE FROM routines 
    WHERE id= $1
    `,
    [routineId]
  );
}

module.exports = {
  createRoutine,
  getAllRoutines,
  getRoutineById,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getRoutinesWithoutActivities,
  getPublicRoutinesByActivity,
  updateRoutine,
  destroyRoutine,
};
