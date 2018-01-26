
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('recruits').del()
    .then(function () {
      // Inserts seed entries
      return knex('recruits').insert([
        {name: 'Patrick', heroClass: 'Paladin', weapon_id: null, level: 2, user_id: 1},
        {name: 'Patty', heroClass: 'Paladin', weapon_id: null, level: 2, user_id: 1},
        {name: 'Penny', heroClass: 'Priest', weapon_id: null, level: 2, user_id: 1},
        {name: 'Mark', heroClass: 'Mage', weapon_id: null, level: 2, user_id: 1},
        {name: 'Wally', heroClass: 'Warlock', weapon_id: null, level: 1, user_id: 1},
        {name: 'Ryan', heroClass: 'Rogue', weapon_id: null, level: 1, user_id: 1},
        {name: 'Weston', heroClass: 'Warrior', weapon_id: null, level: 1, user_id: 1},
        {name: 'Max', heroClass: 'Monk', weapon_id: null, level: 2, user_id: 1},
      ]);
    });
};
