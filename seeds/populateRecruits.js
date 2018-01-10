
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('recruits').del()
    .then(function () {
      // Inserts seed entries
      return knex('recruits').insert([
        {id: 1, name: 'Jeff', heroClass: 'Paladin', weapon_id: null, level: 1, user_id: 1},
        {id: 2, name: 'Ryan', heroClass: 'Priest', weapon_id: null, level: 1, user_id: 1},
        {id: 3, name: 'Will Smith', heroClass: 'Mage', weapon_id: null, level: 1, user_id: 1},
      ]);
    });
};
