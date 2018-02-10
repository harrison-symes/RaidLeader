var Knex = require('knex')
var config = require('../../knexfile')[process.env.NODE_ENV || 'development']
var knex = Knex(config)

const getRecruitById = id => knex('recruits').where({id}).first()

module.exports = {
  getRecruits: (user_id) => knex('recruits').where('user_id', user_id),
  equipWeapon: (id, weapon_id) => knex('recruits').update({weapon_id}).where({id}),
  addRecruit: (user_id, name, level, heroClass, zodiac) => knex('recruits').insert({user_id, name, level, heroClass, zodiac}, 'id')
    .then(id => knex('recruits').where({id: id[0]}).first()),
  levelUpRecruit: (id, level) => knex('recruits').where({id}).update({level})
    .then(() => getRecruitById(id))
}
