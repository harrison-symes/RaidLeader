var Knex = require('knex')
var config = require('../../knexfile')[process.env.NODE_ENV || 'development']
// console.log({config});
var knex = Knex(config)

module.exports = knex
