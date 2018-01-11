
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('playerSpells').del()
    .then(function () {
      // Inserts seed entries
      return knex('playerSpells').insert([
        {id: 1, name: 'Lesser Heal', user_id: 1},
        {id: 2, name: 'Heal', user_id: 1},
        {id: 3, name: 'Greater Heal', user_id: 1},
        {id: 4, name: 'Healing Ring', user_id: 1},
        {id: 5, name: 'Bind', user_id: 1},
        {id: 6, name: 'Fireball', user_id: 1},
        {id: 7, name: 'Fireblast', user_id: 1},
        {id: 8, name: 'Flash Fire', user_id: 1},
        {id: 9, name: 'Life Tap', user_id: 1},
        {id: 10, name: 'Evocate', user_id: 1},
        {id: 11, name: 'Drain Life', user_id: 1},
        {id: 12, name: 'Harvest Life', user_id: 1},
        {id: 13, name: 'Drain Soul', user_id: 1}
      ]);
    });
};
