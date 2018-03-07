var router = require('express').Router()

var {userExists, createUser} = require('../db/users')
var token = require('../auth/token')

router.post('/register', register, token.issue)

function register (req, res, next) {
  const {user_name, password} = req.body
  userExists(user_name)
    .then(exists => {
      if (exists) return res.status(400).send({message: "User exists"})
      createUser(user_name, password)
        .then(() => next())
    })
}



router.post('/login', token.issue)

module.exports = router
