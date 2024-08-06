const db = require('../../data/dbConfig');

const getAll = () => {
  return db('tasks')
}

async function add(task) {
    const [task_id] = await db('tasks').insert(task)
    return db('tasks').where({ task_id: id }).first
}

module.exports = {
  getAll,
  add,
}