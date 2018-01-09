
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('recruits').del()
    .then(function () {
      // Inserts seed entries
      return knex('recruits').insert([
        {id: 1, name: 'Jeff', class: 'Paladin', weapon_id: null, level: 1, user_id: 1},
        {id: 2, name: 'Ryan', class: 'Priest', weapon_id: null, level: 1, user_id: 1},
        {id: 3, name: 'Will Smith', class: 'Mage', weapon_id: null, level: 1, user_id: 1},
      ]);
    });
};
