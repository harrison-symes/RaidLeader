const knex = require('./connection')

const getRecruitById = (id, testDb) => (testDb || knex)('recruits').where({id}).first()

module.exports = {
  getRecruitById,
  getRecruits: (user_id, testDb) => (testDb || knex)('recruits')
    .where('user_id', user_id),
  equipWeapon: (id, weapon_id, testDb) => (testDb || knex)('recruits')
    .update({weapon_id})
    .where({id}),
  addRecruit: (user_id, name, level, heroClass, zodiac, testDb) => (testDb || knex)('recruits')
    .insert({user_id, name, level, heroClass, zodiac}, 'id')
    .then(id => getRecruitById(id[0], testDb)),
  levelUpRecruit: (id, level, testDb) => (testDb || knex)('recruits')
    .where({id})
    .update({level})
    .then(() => getRecruitById(id, testDb)),
  changeZodiac: (id, zodiac, testDb) => (testDb || knex)('recruits')
    .where({id})
    .update({zodiac})
    .then(() => getRecruitById(id, testDb))
}
