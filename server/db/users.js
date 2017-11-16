var hash = require('../auth/hash')

function createUser (user_name, password, db) {
  return new Promise ((resolve, reject) => {
    hash.generate(password, (err, hash) => {
      if (err) reject(err)
      db('users')
        .insert({user_name, hash})
        .then(user_id => resolve(user_id))
    })

  })
}
function userExists (user_name, db) {
  console.log({user_name});
  return db('users')
    .where('user_name', user_name)
    .then(user => return !!user)
}

function getUserByName (user_name, db) {
  return db('users')
    .where('user_name', user_name)
    .first()
}

module.exports = {
  createUser,
  userExists,
  getUserByName
}
