var Knex = require('knex')
var config = require('../../knexfile')[process.env.NODE_ENV || 'development']
var knex = Knex(config)

module.exports = {
  getDungeons: () => knex('dungeons'),
  getCompletedDungeons: (user_id) => knex('playerCompletedDungeon').where('user_id', user_id),
  getBosses: () => knex('bosses')
}
