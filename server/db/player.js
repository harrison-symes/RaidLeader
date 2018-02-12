var Knex = require('knex')
var config = require('../../knexfile')[process.env.NODE_ENV || 'development']
var knex = Knex(config)

const getWeaponById = id => knex('inventory').where({id}).first()

module.exports = {
  getPlayerGold: (user_id) => knex('users').where({user_id}).first(),
  updatePlayerGold: (user_id, gold) => knex('users').update({gold}).where({user_id}),
  addWeapon: (user_id, name, level) => knex('inventory').insert({user_id, name, level, is_weapon: true}, 'id')
    .then(id => getWeaponById(id[0])),
  getWeapons: user_id => knex('inventory').where({is_weapon: true, user_id}),
  delWeapon: (id) => knex('inventory').where({id}).del()
}
