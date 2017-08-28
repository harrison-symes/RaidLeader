var router = require('express').Router()

var {userExists, crateUser} = require('../db/users')
var token = require('../auth/token')

router.post('/register', register, token.issue)

function register (req, res, next) {
  const {username, password} = req.body
  userExists(username, req.app.get('db'))
    .then(exists => {
      if (exists) return res.status(400).send({message: "User exists"})
      createUser(username, password, req.app.get('db'))
        .then(() => next())
    })
    .catch(err => res.status(500).send({message: err.message}))
}



// router.post('/login', )

module.exports = router
