
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('recruits', table => {
    table.increments('id')
    table.string('name')
    table.string('heroClass')
    table.integer('level').defaultTo(1)
    table.integer('weapon_id').defaultTo(null)
    table.integer('user_id')
    table.string('zodiac').defaultTo('Aries')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('recruits')
};
