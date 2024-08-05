exports.up = function(knex) {

return knex.schema.createTable('projects', table => {
    table.increments('project_id')
    table.string('project_name').notNullable()
    table.text('project_description')
    table.boolean('project_completed').defaultTo(false)
})
.createTable('resources', table => {
    table.increments('resource_id') 
    table.string('resource_name').notNullable().unique()
    table.text('resource_description') 
  })
  .createTable('tasks', table => {
    table.increments('task_id')
    table.text('task_description').notNullable() 
    table.text('task_notes')
    table.boolean('task_completed').defaultTo(false) 
    table.integer('project_id') 
      .unsigned()
      .notNullable()
      .references('project_id')
      .inTable('projects')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  })
}
exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('tasks')
        .dropTableIfExists('resources')
        .dropTableIfExists('projects');
}