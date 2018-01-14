
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('dungeons').del()
    .then(function () {
      // Inserts seed entries
      return knex('dungeons').insert([
        {id: 1, name: 'The Hunt', is_repeatable: false, max_party: 1, max_spells: 1, min_level: 1, rewards: JSON.stringify([]), gold_reward: 500},
        {id: 2, name: 'The Wilds', is_repeatable: true, max_party: 2, max_spells: 2, min_level: 1, rewards: JSON.stringify(['Dungeon 2 Reward 1', 'Dungeon 2 Reward 2']), gold_reward: 200},
        {id: 3, name: 'The Swamp', is_repeatable: true, max_party: 3, max_spells: 3, min_level: 2, rewards: JSON.stringify([]), gold_reward: 300},
        {id: 4, name: 'The Foundry', is_repeatable: true, max_party: 3, max_spells: 3, min_level: 3, rewards: JSON.stringify([]), gold_reward: 500},
        {id: 5, name: 'The Armory', is_repeatable: true, max_party: 3, max_spells: 3, min_level: 4, rewards: JSON.stringify([]), gold_reward: 1000},
        {id: 6, name: 'The Lair', is_repeatable: true, max_party: 5, max_spells: 5, min_level: 5, rewards: JSON.stringify([]), gold_reward: 2000}
      ]);
    });
};
