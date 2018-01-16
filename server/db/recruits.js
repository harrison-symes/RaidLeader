var Knex = require('knex')
var config = require('../../knexfile')[process.env.NODE_ENV || 'development']
var knex = Knex(config)

module.exports = {
  getRecruits: (user_id) => knex('recruits').where('user_id', user_id),
  equipWeapon: (id, weapon_id) => knex('recruits').update({weapon_id}).where({id}),
  addRecruit: (user_id, name, level, heroClass) => knex('recruits').insert({user_id, name, level, heroClass})
    .then(id => knex('recruits').where({id: id[0]}).first())
}
