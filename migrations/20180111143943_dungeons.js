
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('dungeons', table => {
    table.increments('id')
    table.string('name')
    table.integer('min_level')
    table.integer('max_party')
    table.integer('max_spells')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('dungeons')
};
