
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('playerCompletedDungeon', table => {
    table.integer('user_id')
    table.integer('dungeon_id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('playerCompletedDungeon')
};
