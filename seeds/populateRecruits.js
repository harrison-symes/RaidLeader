
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('recruits').del()
    .then(function () {
      // Inserts seed entries
      return knex('recruits').insert([
        {zodiac: 'Aries', name: 'Patrick', heroClass: 'Paladin', weapon_id: null, level: 2, user_id: 1},
        {zodiac: 'Aries', name: 'Patty', heroClass: 'Paladin', weapon_id: null, level: 2, user_id: 1},
        {zodiac: 'Aries', name: 'Penny', heroClass: 'Priest', weapon_id: null, level: 2, user_id: 1},
        {zodiac: 'Aries', name: 'Mark', heroClass: 'Mage', weapon_id: null, level: 2, user_id: 1},
        {zodiac: 'Aries', name: 'Wally', heroClass: 'Warlock', weapon_id: null, level: 1, user_id: 1},
        {zodiac: 'Aries', name: 'Ryan', heroClass: 'Rogue', weapon_id: null, level: 1, user_id: 1},
        {zodiac: 'Aries', name: 'Weston', heroClass: 'Warrior', weapon_id: null, level: 1, user_id: 1},
        {zodiac: 'Aries', name: 'Max', heroClass: 'Monk', weapon_id: null, level: 2, user_id: 1},
        {zodiac: 'Aries', name: 'Harrison', heroClass: 'Hunter', weapon_id: null, level: 2, user_id: 1},
      ]);
    });
};
