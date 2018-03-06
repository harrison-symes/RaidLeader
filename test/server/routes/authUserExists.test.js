const request = require('supertest')
var JWT    = require('jsonwebtoken')

var secret = 'KRANG'
process.env.JWT_SECRET = secret
process.env.NODE_ENV = 'test'

const mockIssue = jest.fn()



jest.mock('../../../server/db/users', () => ({
  userExists: () => Promise.resolve(true),
  createUser: () => Promise.resolve(true),
}))

jest.mock('../../../server/auth/token', () => ({
  issue: (req, res) => {
    res.json('done')
    mockIssue()
  },
  decode: (req, res, next) => next()
}))

const server = require('../../../server/server')

test('/register', () => {
  return request(server)
    .post('/api/v1/auth/register')
    .send({user_name: 'Jeff', password: 'mynamejeff'})
    .expect(400)
    .then(res => {
    })
    .catch(err => {
      expect(err).toBeFalsy()
    })

})
