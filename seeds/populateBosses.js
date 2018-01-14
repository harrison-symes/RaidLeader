
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('bosses').del()
    .then(function () {
      // Inserts seed entries
      return knex('bosses').insert([
        {id: 1, name: 'Damaged Dragon', dungeon_id: 1},
        {id: 2, name: 'Biting Bear', dungeon_id: 2, progress_required: 0},
        {id: 3, name: 'Trampling Turtle', dungeon_id: 2, progress_required: 1},
        {id: 4, name: 'Spitting Spider', dungeon_id: 2, progress_required: 2}
      ]);
    });
};
