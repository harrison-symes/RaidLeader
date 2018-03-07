const knex = require('./connection')

module.exports = {
  getDungeons: (testDb) => (testDb || knex)('dungeons'),
  getCompletedDungeons: (user_id, testDb) => (testDb || knex)('playerCompletedDungeon').where('user_id', user_id),
  getBosses: (testDb) => (testDb || knex)('bosses'),
  dungeonComplete: (user_id, dungeon_id, testDb) => (testDb || knex)('playerCompletedDungeon').insert({user_id, dungeon_id})
}
