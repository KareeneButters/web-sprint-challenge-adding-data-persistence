const db = require('../../data/dbConfig');

const getAll = async () => {
  return await db('tasks')
    .join('projects as p', 'tasks.project_id', 'p.project_id') // Join with the projects table
    .select(
      'tasks.task_id',
      'tasks.task_description',
      'tasks.task_notes',
      'tasks.task_completed', // This will be an integer from the database
      'p.project_name', // Select project_name from the projects table
      'p.project_description' // Select project_description from the projects table
    )
}

async function add(task) {
  // Convert task_completed to boolean before inserting
  task.task_completed = task.task_completed ? true : false; // Ensure it's a boolean

  const [task_id] = await db('tasks').insert(task); // Insert the new task
  const newTask = await db('tasks').where({ task_id }).first(); // Retrieve the newly created task
  return {
    ...newTask,
    task_completed: Boolean(newTask.task_completed), // Ensure it's a boolean
  }
} 

module.exports = {
  getAll,
  add,
}