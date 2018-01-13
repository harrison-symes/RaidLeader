
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('bosses', table => {
    table.increments('id')
    table.string('name')
    table.integer('dungeon_id')
    table.integer('min_level').defaultTo(1)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('bosses')
};
