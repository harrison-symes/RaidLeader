const request = require('supertest')
var JWT    = require('jsonwebtoken')
var secret = 'KRANG'
process.env.JWT_SECRET = secret

jest.mock('../../../server/db/recruits', () => ({
  getRecruits: () => Promise.resolve([{}, {}]),
  addRecruit: (user_id, name, level, heroClass, zodiac) => Promise.resolve({user_id, name, level, heroClass, zodiac}),
  equipWeapon: () => Promise.resolve(),
  levelUpRecruit: (id, level) => Promise.resolve({id, level})
}))

const server = require('../../../server/server')

var token = JWT.sign({ user_id:1,"name":"Harrison" }, secret);
const headers = {
  Accept: 'application/json',
  Authorization: "Bearer "+token
}

test('GET /recruits', () => {
  return request(server)
    .get('/api/v1/recruits')
    .set(headers)
    .expect(200)
    .then(res => {
      expect(res.body.length).toBe(2)
    })
    .catch(err => {
      expect(err).toBeFalsy()
    })
})

test('POST /recruits', () => {
  return request(server)
    .post('/api/v1/recruits')
    .set(headers)
    .send({name: 'Jeff', zodiac: 'Aries', heroClass: 'Mage'})
    .expect(201)
    .then(res => {
      expect(res.body).toEqual({
        name: 'Jeff',
        level: 1,
        zodiac: 'Aries',
        user_id: 1,
        heroClass: 'Mage'
      })
    })
    .catch(err => {
      expect(err).toBeFalsy()
    })
})

test('PUT /recruits/weapons', () => {
  return request(server)
  .put('/api/v1/recruits/weapons')
  .set(headers)
  .send({id: 1, weapon_id: 1})
  .expect(202)
  .catch(err => {
    expect(err).toBeFalsy()
  })
})

test('PUT /recruits/level', () => {
  return request(server)
  .put('/api/v1/recruits/level')
  .set(headers)
  .send({id: 1, level: 2})
  .expect(200)
  .then(res => {
    expect(res.body).toEqual({
      id: 1,
      level: 2
    })
  })
  .catch(err => {
    expect(err).toBeFalsy()
  })
})
