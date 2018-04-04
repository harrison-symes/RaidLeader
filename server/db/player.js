const knex = require('./connection')

const getWeaponById = (id, testDb) => (testDb || knex)('inventory').where({id}).first()

const getPlayer = (user_id, testDb) => (testDb || knex)('users').where({user_id}).first()

module.exports = {
  getWeaponById,
  getPlayerGold: (user_id, testDb) => (testDb || knex).select('gold').from('users').where({user_id}).first(),
  updatePlayerGold: (user_id, gold, testDb) => (testDb || knex)('users').update({gold}).where({user_id}),
  addWeapon: (user_id, name, level, testDb) => (testDb || knex)('inventory').insert({user_id, name, level, is_weapon: true}, 'id')
    .then(id => getWeaponById(id[0], testDb)),
  getWeapons: (user_id, testDb) => (testDb || knex)('inventory').where({is_weapon: true, user_id}),
  delWeapon: (id, testDb) => (testDb || knex)('inventory').where({id}).del(),
  getPlayer,
  playerGainExperience: (user_id, experience, testDb) => getPlayer(user_id, testDb)
    .then(player => {
      return (testDb || knex)('users').update({experience: (experience || 0) + player.experience}).where({user_id})
    }),
  playerGainGems: (user_id, gems, testDb) => getPlayer(user_id, testDb)
    .then(player => {
      return (testDb || knex)('users').update({gems: (gems || 0) + player.gems}).where({user_id})
    }),
  getPlayerTraits: (user_id, testDb) => (testDb || knex)('traits')
    .where({user_id}),
  insertTrait: (user_id, name, testDb) => (testDb || knex)('Traits')
    .insert({user_id, name})
}
