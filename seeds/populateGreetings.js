const bcrypt = require('bcrypt')


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {user_name: 'Krang', hash: bcrypt.hashSync('Krang', 10), gold: 1000000, experience: 0, gems: 500}
      ]);
    });
};
