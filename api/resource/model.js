const db = require('../../data/dbConfig')

const getAll = () => {
    return db('resources')
}

async function add(resource) {
    const [id] = await db('resources').insert(resource)
    return db('resources').where({ resource_id: id }).first()
}

const findByName = async (name) => {
    return await db('resources').where({ resource_name: name }).first()
}


module.exports = {
    getAll,
    add,
    findByName,
}