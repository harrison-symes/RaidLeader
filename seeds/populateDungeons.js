
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('dungeons').del()
    .then(function () {
      // Inserts seed entries
      return knex('dungeons').insert([
        {id: 1, name: 'The Hunt', max_party: 1, max_spells: 1, min_level: 1},
        {id: 2, name: 'The Wilds', max_party: 2, max_spells: 2, min_level: 1},
        {id: 3, name: 'The Swamp', max_party: 3, max_spells: 3, min_level: 2},
        {id: 4, name: 'The Foundry', max_party: 3, max_spells: 3, min_level: 3},
        {id: 5, name: 'The Armory', max_party: 3, max_spells: 3, min_level: 4},
        {id: 6, name: 'The Lair', max_party: 5, max_spells: 5, min_level: 5}
      ]);
    });
};
