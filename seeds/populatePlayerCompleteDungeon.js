
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('playerCompletedDungeon').del()
    .then(function () {
      // Inserts seed entries
      return knex('playerCompletedDungeon').insert([
        {user_id: 1, dungeon_id: 1},
      ]);
    });
};
