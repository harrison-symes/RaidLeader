var hash = require('../auth/hash')

function createUser (username, password, db) {
  return new Promise ((resolve, reject) => {
    hash.generate(password, (err, hash) => {
      if (err) reject(err)
      db('users')
        .insert({username, hash})
        .then(user_id => resolve(user_id))
    })

  })
}

function userExists (username, db) {
  return db('users')
    .count('id as n')
    .where('username', username)
    .then(count => {
      return count[0].n > 0
    })
}

function getUserByName (username, db) {
  return db('users')
    .where('username', username)
    .first()
}

module.exports = {
  createUser,
  userExists,
  getUserByName
}
