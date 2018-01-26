
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('inventory').del()
    .then(function () {
      // Inserts seed entries
      return knex('inventory').insert([
        {name: 'Dragon Scale', level: 1, is_weapon: true, user_id: 1},
        {name: 'Bear Fangs', level: 1, is_weapon: true, user_id: 1},
        {name: 'Training Staff', level: 1, is_weapon: true, user_id: 1},
        {name: 'Plagued Staff of the Swamp', level: 2, is_weapon: true, user_id: 1},
        {name: 'Cleansed Staff of the Woods', level: 2, is_weapon: true, user_id: 1},
        {name: 'Plagued Wand', level: 2, is_weapon: true, user_id: 1},
      ]);
    });
};
