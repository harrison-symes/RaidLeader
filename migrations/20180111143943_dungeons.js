
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('dungeons', table => {
    table.increments('id')
    table.string('name')
    table.integer('min_level')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('dungeons')
};
