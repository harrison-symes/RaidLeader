
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('playerTraits', table => {
    table.increments('id')
    table.integer('user_id')
    table.string('name')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('playerTraits')
};
