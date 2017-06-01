
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('greetings', (table) => {
    table.increments('id')
    table.string('text')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('greetings')
};
