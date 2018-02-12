var Knex = require('knex')
var config = require('../../knexfile')[process.env.NODE_ENV || 'development']
var knex = Knex(config)

module.exports = {
  getSpells: (user_id) => knex('playerSpells').where('user_id', user_id),
  addSpell: (user_id, name) => knex('playerSpells').insert({user_id, name}, 'id')
    .then(id => knex('playerSpells').where({id: id[0]}).first()),
  deleteSpell: (user_id, name) => knex('playerSpells').where({user_id, name}).del()
}
