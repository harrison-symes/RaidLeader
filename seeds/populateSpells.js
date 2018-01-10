
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('playerSpells').del()
    .then(function () {
      // Inserts seed entries
      return knex('playerSpells').insert([
        {id: 1, name: 'Lesser Heal', user_id: 1},
        {id: 2, name: 'Fireball', user_id: 1},
        {id: 3, name: 'Harvest_Life', user_id: 1}
      ]);
    });
};
