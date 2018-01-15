
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('dungeons').del()
    .then(function () {
      // Inserts seed entries
      return knex('dungeons').insert([
        {id: 1, name: 'The Hunt', level: 1, is_repeatable: false, max_party: 1, max_spells: 1, requires_complete: null, rewards: JSON.stringify([]), gold_reward: 500},
        {id: 2, name: 'The Wilds', level: 1, is_repeatable: true, max_party: 2, max_spells: 2, requires_complete: 'The Hunt', rewards: JSON.stringify(['Dungeon 2 Reward 1', 'Dungeon 2 Reward 2']), gold_reward: 200},
        {id: 3, name: 'The Swamp', level: 2, is_repeatable: true, max_party: 3, max_spells: 3, requires_complete: 'The Wilds', rewards: JSON.stringify([]), gold_reward: 300},
        {id: 4, name: 'The Foundry', level: 3, is_repeatable: true, max_party: 3, max_spells: 3, requires_complete: 'The Swamp', rewards: JSON.stringify([]), gold_reward: 500},
        {id: 5, name: 'The Armory', level: 4, is_repeatable: true, max_party: 3, max_spells: 3, requires_complete: 'The Foundry', rewards: JSON.stringify([]), gold_reward: 1000},
        {id: 6, name: 'The Lair', level: 5, is_repeatable: true, max_party: 5, max_spells: 5, requires_complete: 'The Armory', rewards: JSON.stringify([]), gold_reward: 2000}
      ]);
    });
};
