var hash = require('../auth/hash')

const knex = require('./connection')

function createUser (user_name, password, testDb) {
  return new Promise ((resolve, reject) => {
    hash.generate(password, (err, hash) => {
      if (err) reject(err)
      insertUser(user_name, hash, testDb)
        .then(user_id => resolve(user_id))
        .catch(err => reject(err))
    })

  })
}

function insertUser(user_name, hash, testDb) {
  return (testDb || knex)('users')
    .insert({user_name, hash}, 'user_id')
}

function userExists (user_name, testDb) {
  return getUserByName(user_name, testDb)
    .then(user => !!user)
}

function getUserByName (user_name, testDb) {
  return (testDb || knex)('users')
    .where('user_name', user_name)
    .first()
}

module.exports = {
  createUser,
  userExists,
  getUserByName
}
