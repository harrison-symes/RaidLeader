
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('recruits').del()
    .then(function () {
      // Inserts seed entries
      return knex('recruits').insert([
        {id: 1, name: 'Patrick', heroClass: 'Paladin', weapon_id: null, level: 1, user_id: 1},
        {id: 2, name: 'Penny', heroClass: 'Priest', weapon_id: null, level: 1, user_id: 1},
        {id: 3, name: 'Mark', heroClass: 'Mage', weapon_id: null, level: 1, user_id: 1},
        {id: 4, name: 'Wally', heroClass: 'Warlock', weapon_id: null, level: 1, user_id: 1},
        {id: 5, name: 'Ryan', heroClass: 'Rogue', weapon_id: null, level: 1, user_id: 1},
        {id: 6, name: 'Weston', heroClass: 'Warrior', weapon_id: null, level: 1, user_id: 1},
        {id: 7, name: 'Max', heroClass: 'Monk', weapon_id: null, level: 1, user_id: 1},
      ]);
    });
};
