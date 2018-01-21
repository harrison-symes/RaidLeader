
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('bosses').del()
    .then(function () {
      // Inserts seed entries
      return knex('bosses').insert([
        {id: 1, name: 'Damaged Dragon', dungeon_id: 1},
        {id: 2, name: 'Biting Bear', dungeon_id: 2, progress_required: 0},
        {id: 3, name: 'Trampling Turtle', dungeon_id: 2, progress_required: 1},
        {id: 4, name: 'Spitting Spider', dungeon_id: 2, progress_required: 2},
        {id: 5, name: 'Seeping Slime', dungeon_id: 3, progress_required: 0},
        {id: 6, name: 'Decaying Deer', dungeon_id: 3, progress_required: 1},
        {id: 7, name: 'Lunging Locusts', dungeon_id: 3, progress_required: 1}
        {id: 8, name: 'Plague Piltherer', dungeon_id: 3, progress_required: 2}
      ]);
    });
};
