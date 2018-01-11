
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('inventory', table => {
    table.increments('id')
    table.boolean('is_weapon').defaultTo(true)
    table.string('name')
    table.integer('level').defaultTo(1)
    table.integer('user_id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('inventory')
};
