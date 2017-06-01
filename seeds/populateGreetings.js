
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('greetings').del()
    .then(function () {
      // Inserts seed entries
      return knex('greetings').insert([
        {id: 1, text: 'Hello There'},
        {id: 2, text: 'Greetings Friend'},
        {id: 3, text: 'Well Met'}
      ]);
    });
};
