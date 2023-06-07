const client = require("../client");


async function getRoutineActivityById(routineActivityId)


async function addActivityToRoutine(routineId, activityId, count, duration)


async function updateRoutineActivity(routineActivityId, count, duration)


async function destroyRoutineActivity(routineActivityId)

 
async function getRoutineActivitiesByRoutine(routineId)


module.exports = { 
    getRoutineActivityById,
    addActivityToRoutine,
    updateRoutineActivity,
    destroyRoutineActivity,
    getRoutineActivitiesByRoutine
      };
