const knex = require('./connection')

const getSpellByID = (id, testDb) => (testDb || knex)('playerSpells').where({id}).first()

module.exports = {
  getSpellByID,
  getSpells: (user_id, testDb) => (testDb || knex)('playerSpells').where('user_id', user_id),
  addSpell: (user_id, name, testDb) => (testDb || knex)('playerSpells').insert({user_id, name}, 'id')
    .then(id => getSpellByID(id[0], testDb)),
  deleteSpell: (user_id, name, testDb) => (testDb || knex)('playerSpells').where({user_id, name}).del()
}
