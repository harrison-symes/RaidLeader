
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('playerCompletedDungeon').del()
    .then(() => {
      return knex('playerCompletedDungeon').insert([
        {user_id: 1, dungeon_id: 1},
        {user_id: 1, dungeon_id: 2},
        {user_id: 1, dungeon_id: 3}
      ])
    })
};
