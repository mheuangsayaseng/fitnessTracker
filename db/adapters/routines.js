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
        FROM routine
        FULL OUTER JOIN routines_activities
        ON routines.id = routine_activities.routine_id
        FULL OUTER JOIN activities
        ON activities.id = routine_activities.activity_id
        GROUP BY routines.id, routine_activities.routine_id
      `);
      return rows;
    } catch (error) {
      throw error;
    }
}

    async function getRoutinesWithoutActivities()
      try {
        const {
          rows: [routine],
      } = await client.query(
        `
        SELECT *
        FROM routines;
        `
      );

      return routine;

      } catch (error) {
        throw error;
      }


    async function getAllPublicRoutines()
      try {
        const {
          rows: [routine],
        } = await client.query(
          `
          SELECT is_public
          FROM routine 
          RETURNING *
          JOIN activities ON activities.id=activities."activitiesId"
          WHERE activities."activitiesId"=$1;
          `
        );
        return routine(), activities();
      
      } catch (error) {
        throw error;
      }


    //  async function getAllRoutinesByUser(username)
    //  try {
    //   const {
    //     rows: [routine],
    //   } = await client.query(
    //     `
    //     SELECT *
    //     FROM routine 
    //     WHERE "routine
    //     RETURNING *
    //     JOIN activities ON activities.id=activities."activitiesId"
    //     WHERE activities."activitiesId"=$1;
    //     `
    //   );
    //   return routine(), activities();
    
    // } catch (error) {
    //   throw error;
    // }

      



    async function getPublicRoutinesByUser(username)
    try {
      const {
        rows: [routine],
      } = await client.query(
        `
        SELECT is_public
        FROM routine 
        RETURNING *
        JOIN activities ON activities.id=activities."activitiesId"
        WHERE activities."activitiesId"=$1;
        `
      );
      return routine(), activities();
    
    } catch (error) {
      throw error;
    }
      


    async function getPublicRoutinesByActivity(activityId)
    try {
      const {
        rows: [routine],
      } = await client.query(
        `
        SELECT is_public
        FROM routine, routine_activities
        JOIN activities ON activities.id=activities."activitiesId"
        WHERE activities."activitiesId"=$1;
        `
      );
      return routine(), activities();
    
    } catch (error) {
      throw error;
    }
      


    // async function updateRoutine(routineId, isPublic, name, goal)
      


    // async function destroyRoutine(routineId)

module.exports = { createRoutine, 
                  getAllRoutines, 
                  getRoutineById, 
                  getRoutinesWithoutActivities, 
                  getAllPublicRoutines, 
                  getPublicRoutinesByUser, 
                  // getAllRoutinesByUser, 
                  getPublicRoutinesByActivity,
                  // updateRoutine,
                  // destroyRoutine
                    };
