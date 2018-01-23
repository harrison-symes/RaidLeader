
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('inventory').del()
    .then(function () {
      // Inserts seed entries
      return knex('inventory').insert([
        {id: 1, name: 'Dragon Scale', level: 1, is_weapon: true, user_id: 1},
        {id: 2, name: 'Bear Fangs', level: 1, is_weapon: true, user_id: 1},
        {id: 3, name: 'Training Staff', level: 1, is_weapon: true, user_id: 1},
        {id: 4, name: 'Plagued Staff of the Swamp', level: 2, is_weapon: true, user_id: 1},
        {id: 5, name: 'Cleansed Staff of the Woods', level: 2, is_weapon: true, user_id: 1},
      ]);
    });
};
