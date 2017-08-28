var jwt = require('jsonwebtoken')
var {getUserByName} = require('../db/users')
var verifyJwt = require('express-jwt')

function issue (req, res) {
  getUserByName(req.body.username, req.app.get('db'))
    .then(user => {
      var token = createToken(user, process.env.JWT_SECRET)
      res.json({
        message: 'Authentication successful',
        token
      })
    })
}

function createToken (user, secret) {
  return jwt.sign({
    id:user.id,
    username: user.username
  }, secret, {
    expiresIn: '24h'
  })
}

function getSecret(req, payload, done) {
  done(null, process.env.JWT_SECRET)
}

function decode (req, res, next) {
  verifyJwt({secret: getSecret})(req, res, next)
}

module.exports = {
  issue,
  createToken,
  decode
}
