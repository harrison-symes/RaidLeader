const bcrypt = require('bcrypt')


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {user_id: 1, user_name: 'symeshjb', hash: bcrypt.hashSync('Harrison145', 10), gold: 10000}
      ]);
    });
};
