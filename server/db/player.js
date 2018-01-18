var Knex = require('knex')
var config = require('../../knexfile')[process.env.NODE_ENV || 'development']
var knex = Knex(config)

module.exports = {
  getPlayerGold: (user_id) => knex.select('gold').from('users').where({user_id}).first(),
  updatePlayerGold: (user_id, gold) => knex('users').update({gold}).where({user_id}),
  addWeapon: (user_id, name, level) => knex('inventory').insert({user_id, name, level, is_weapon: true}),
  getWeapons: user_id => knex('inventory').where({is_weapon: true, user_id})
}
