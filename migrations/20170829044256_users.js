
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('users', table => {
    table.increments('user_id')
    table.string('user_name')
    table.string('hash')
    table.integer('gold').defaultTo(0)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users')
};
