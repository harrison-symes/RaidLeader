
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('dungeons').del()
    .then(function () {
      // Inserts seed entries
      return knex('dungeons').insert([
        {id: 1, name: 'The Hunt', min_level: 1},
        {id: 2, name: 'The Wilds', min_level: 1},
        {id: 3, name: 'The Swamp', min_level: 2},
        {id: 4, name: 'The Foundry', min_level: 3},
        {id: 5, name: 'The Armory', min_level: 4},
        {id: 6, name: 'The Lair', min_level: 5}
      ]);
    });
};
