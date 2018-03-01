const request = require('supertest')
var JWT    = require('jsonwebtoken')
var secret = 'KRANG'
process.env.JWT_SECRET = secret

jest.mock('../../../server/db/dungeons', () => ({
  getDungeons: () => Promise.resolve([
    {id: 1, name: 'The Hunt'},
    {id: 2, name: 'The Cursed Wilds'}
  ]),
  getCompletedDungeons: () => Promise.resolve([
    {user_id: 1, dungeon_id: 1}
  ]),
  dungeonComplete: () => Promise.resolve(null)
}))

const server = require('../../../server/server')

test('GET /dungeons', () => {
  var token = JWT.sign({ id:1,"name":"Harrison" }, secret);
  const headers = {
    Accept: 'application/json',
    Authorization: "Bearer "+token
  }
  return request(server)
    .get('/api/v1/dungeons')
    .expect(200)
    .set(headers)
    .then(res => {
      expect(res.body.length).toBe(2)
      const completed = res.body.filter(item => item.isCompleted)
      expect(completed.length).toBe(1)
      expect(completed[0].id).toBe(1)
      expect(completed[0].name).toBe('The Hunt')
    })
    .catch(err => {
      expect(err).toBeFalsy()
    })
})

test('POST /dungeons/complete', () => {
  var token = JWT.sign({ id:1,"name":"Harrison" }, secret);
  const headers = {
    Accept: 'application/json',
    Authorization: "Bearer "+token
  }
  return request(server)
    .post('/api/v1/dungeons/complete')
    .send({dungeon_id: 2})
    .set(headers)
    .expect(201)
    .then(res => {
    })
    .catch(err => {
      expect(err).toBeFalsy()
    })
})
