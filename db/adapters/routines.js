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
        SELECT * FROM routine;
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
      FROM routine
      WHERE id=${routineId};
      `);
      if (!routine) {
        return null;
      
      return routine;
    } catch (error) {
      throw error;
    }

    async function getRoutinesWithoutActivities()
      try {
        const {
          rows: [routine],
      } = await client.query(
        `
        SELECT *
        FROM routine
        RETURNING *;
        `
      );

      return routine();

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
