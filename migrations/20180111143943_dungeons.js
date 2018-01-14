
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('dungeons', table => {
    table.increments('id')
    table.string('name')
    table.integer('min_level')
    table.integer('max_party')
    table.integer('max_spells')
    table.boolean('is_repeatable').defaultTo(true)
    table.integer('gold_reward').defaultTo(0)
    table.string('rewards').defaultTo("[]")
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('dungeons')
};
