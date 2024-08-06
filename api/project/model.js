const db = require('../../data/dbConfig')

const getAll = () => {
    return db('projects')
}

async function add(project) {
    const [id] = await db('projects').insert(project);
    return db('projects').where({ project_id: id }).first();
  }

module.exports = {
    getAll,
    add,
}