
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('playerSpells').del()
    .then(function () {
      // Inserts seed entries
      return knex('playerSpells').insert([
        {name: 'Lesser Heal', user_id: 1},
        {name: 'Heal', user_id: 1},
        {name: 'Greater Heal', user_id: 1},
        {name: 'Healing Ring', user_id: 1},
        {name: 'Bind', user_id: 1},
        {name: 'Fireball', user_id: 1},
        {name: 'Fireblast', user_id: 1},
        {name: 'Flash Fire', user_id: 1},
        {name: 'Life Tap', user_id: 1},
        {name: 'Evocate', user_id: 1},
        {name: 'Drain Life', user_id: 1},
        {name: 'Harvest Life', user_id: 1},
        {name: 'Drain Soul', user_id: 1},
        {name: 'Renew', user_id: 1},
        {name: 'Greater Renew', user_id: 1}
      ]);
    });
};
