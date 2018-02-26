const request = require('supertest')
var JWT    = require('jsonwebtoken')
var secret = 'KRANG'
process.env.JWT_SECRET = secret

jest.mock('../../../server/db/spells', () => ({
  getSpells: () => Promise.resolve([{}, {}]),
  addSpell: (user_id, name) => Promise.resolve({user_id, name}),
  deleteSpell: () => Promise.resolve()
}))

const server = require('../../../server/server')

var token = JWT.sign({ user_id:1,"name":"Harrison" }, secret);
const headers = {
  Accept: 'application/json',
  Authorization: "Bearer "+token
}

test('GET /spells', () => {
  return request(server)
    .get('/api/v1/spells')
    .set(headers)
    .expect(200)
    .then(res => {
      expect(res.body.length).toBe(2)
    })
    .catch(err => {
      expect(err).toBeFalsy()
    })
})

test('POST /spells', () => {
  return request(server)
    .post('/api/v1/spells')
    .set(headers)
    .send({name: "TEST_SPELL"})
    // .expect(201)
    .then(res => {
      expect(res.body.user_id).toBe(1)
      expect(res.body.name).toBe("TEST_SPELL")
    })
    .catch(err => {
      expect(err).toBeFalsy()
    })
})

test('DEL /spells', () => {
  return request(server)
    .delete('/api/v1/spells')
    .set(headers)
    .send({name: 'Harrison'})
    .expect(202)
    .catch(err => {
      expect(err).toBeFalsy()
    })
})
