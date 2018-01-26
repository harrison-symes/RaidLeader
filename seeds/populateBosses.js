
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('bosses').del()
    .then(function () {
      // Inserts seed entries
      return knex('bosses').insert([
        {name: 'Damaged Dragon', dungeon_id: 1},
        {name: 'Biting Bear', dungeon_id: 2, progress_required: 0},
        {name: 'Trampling Turtle', dungeon_id: 2, progress_required: 1},
        {name: 'Spitting Spider', dungeon_id: 2, progress_required: 2},
        {name: 'Seeping Slime', dungeon_id: 3, progress_required: 0},
        {name: 'Decaying Deer', dungeon_id: 3, progress_required: 1},
        {name: 'Lunging Locusts', dungeon_id: 3, progress_required: 1},
        {name: 'Plague Piltherer', dungeon_id: 3, progress_required: 2}
      ]);
    });
};
