
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('playerTraits').del()
    .then(function () {
      // Inserts seed entries
      return knex('playerTraits').insert([
        {id: 1, user_id: 1, name: 'Quicklight'}
      ]);
    });
};
