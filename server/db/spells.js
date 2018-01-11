var Knex = require('knex')
var config = require('../../knexfile')[process.env.NODE_ENV || 'development']
var knex = Knex(config)

module.exports = {
  getSpells: (user_id) => knex('playerSpells').where('user_id', user_id)
}
