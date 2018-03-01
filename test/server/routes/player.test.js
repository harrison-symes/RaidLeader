const request = require('supertest')
var JWT    = require('jsonwebtoken')
var secret = 'KRANG'
process.env.JWT_SECRET = secret

jest.mock('../../../server/db/spells', () => ({
  addSpell: () => Promise.resolve({name: 'Fake Spell', id: 1})
}))

jest.mock('../../../server/db/recruits', () => ({
  addRecruit: (user_id, name, level, heroClass, zodiac) => Promise.resolve({user_id, name, level, class: heroClass, zodiac, id: 1})
}))

jest.mock('../../../server/db/player', () => ({
  getPlayerGold: () => Promise.resolve({gold: 2000}),
  updatePlayerGold: () => Promise.resolve(null),
  addWeapon: (user_id, name, level) => Promise.resolve({user_id, name, level}),
  getWeapons: () => Promise.resolve([{},{}]),
  delWeapon: (id) => Promise.resolve(null)
}))

const server = require('../../../server/server')

test('GET /player/gold', () => {
  var token = JWT.sign({ user_id:1,"name":"Harrison" }, secret);
  const headers = {
    Accept: 'application/json',
    Authorization: "Bearer "+token
  }
  return request(server)
    .get('/api/v1/player/gold')
    .expect(200)
    .set(headers)
    .then(res => {
      expect(res.body).toBe(2000)
    })
    .catch(err => {
      expect(err).toBeFalsy()
    })
})

test('PUT /player/gold', () => {
  var token = JWT.sign({ user_id:1,"name":"Harrison" }, secret);
  const headers = {
    Accept: 'application/json',
    Authorization: "Bearer "+token
  }
  return request(server)
    .put('/api/v1/player/gold')
    .set(headers)
    .expect(202)
    .then(res => {

    })
    .catch(err => {
      expect(err).toBeFalsy()
    })
})

test('POST /player/weapon', () => {
  var token = JWT.sign({ user_id:1,"name":"Harrison" }, secret);
  const headers = {
    Accept: 'application/json',
    Authorization: "Bearer "+token
  }
  return request(server)
    .post('/api/v1/player/weapon')
    .set(headers)
    .send({name: 'Fake Weapon', level: 500})
    .expect(201)
    .then(res => {
      expect(res.body.name).toBe('Fake Weapon')
      expect(res.body.level).toBe(500)
      expect(res.body.user_id).toBe(1)
    })
    .catch(err => {
      expect(err).toBeFalsy()
    })
})

test('GET /player/weapons', () => {
  var token = JWT.sign({ user_id:1,"name":"Harrison" }, secret);
  const headers = {
    Accept: 'application/json',
    Authorization: "Bearer "+token
  }
  return request(server)
    .get('/api/v1/player/weapons')
    .set(headers)
    .expect(200)
    .then(res => {
      expect(res.body.length).toBe(2)
    })
    .catch(err => {
      expect(err).toBeFalsy()
    })
})

test('DEL /player/weapons', () => {
  var token = JWT.sign({ user_id:1,"name":"Harrison" }, secret);
  const headers = {
    Accept: 'application/json',
    Authorization: "Bearer "+token
  }
  return request(server)
    .delete('/api/v1/player/weapons')
    .set(headers)
    .send({value: 200, id: 1})
    .expect(202)
    .then(res => {
    })
    .catch(err => {
      expect(err).toBeFalsy()
    })
})

test('POST /player/getStarted', () => {
  var token = JWT.sign({ user_id:1,"name":"Harrison" }, secret);
  const headers = {
    Accept: 'application/json',
    Authorization: "Bearer "+token
  }
  return request(server)
    .post('/api/v1/player/getStarted')
    .set(headers)
    .send({name: 'Jeff', zodiac: 'Aries'})
    .expect(201)
    .then(res => {
      expect(res.body.hasOwnProperty('recruit'))
      expect(res.body.hasOwnProperty('spell'))
      expect(res.body.hasOwnProperty('weapon'))
      expect(res.body.recruit).toEqual({id:1, name: 'Jeff', level: 1, zodiac: 'Aries', class: 'Paladin', user_id: 1})
      expect(res.body.spell).toEqual({id:1, name: 'Fake Spell'})
      expect(res.body.weapon).toEqual({user_id:1, name: 'Training Staff', level: 1})
    })
    .catch(err => {
      expect(err).toBeFalsy()
    })
})
