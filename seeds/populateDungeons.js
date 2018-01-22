
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('dungeons').del()
    .then(function () {
      // Inserts seed entries
      return knex('dungeons').insert([
        {id: 1, name: 'The Hunt', level: 1, is_repeatable: false, max_party: 1, max_spells: 1, requires_complete: null, rewards: JSON.stringify([]), gold_reward: 500, description: "The Paladin knows the location of a dying Dragon. Dragons are pretty scary, but they always hoard a large amount of treasure. Hopefully this Dragon won't live long enough to burn you alive..."},
        {id: 2, name: 'The Cursed Wilds', level: 1, is_repeatable: true, max_party: 2, max_spells: 2, requires_complete: 'The Hunt', rewards: JSON.stringify(['Cursed Staff of the Wilds', 'Cleansed Staff of the Wilds']), gold_reward: 250, description: "Patrons of the local Town Pub have told stories of the Cursed Wilds, filled with giant beasts who have been acting more aggressively lately. Will you brave the challenge and free these Beasts from the curse?"},
        {id: 3, name: 'The Swamp', level: 2, is_repeatable: true, max_party: 3, max_spells: 3, requires_complete: 'The Cursed Wilds', rewards: JSON.stringify([]), gold_reward: 500, description: "The once tranquil woods have been overwhelmed by a strange sludge in recent weeks. Many adventurers have sought the source of this plague, but none have returned. That probably means there is a lot of loot to be found here!"},
        {id: 4, name: 'The Foundry', level: 3, is_repeatable: true, max_party: 3, max_spells: 3, requires_complete: 'The Swamp', rewards: JSON.stringify([]), gold_reward: 500},
        {id: 5, name: 'The Armory', level: 4, is_repeatable: true, max_party: 3, max_spells: 3, requires_complete: 'The Foundry', rewards: JSON.stringify([]), gold_reward: 1000},
        {id: 6, name: 'The Lair', level: 5, is_repeatable: true, max_party: 5, max_spells: 5, requires_complete: 'The Armory', rewards: JSON.stringify([]), gold_reward: 2000}
      ]);
    });
};
