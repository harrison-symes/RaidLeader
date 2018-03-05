const env = require('./test-environment')
const usersDb = require('../../../server/db/users')

// Manage the test database

let testDb = null

beforeEach(() => {
  testDb = env.getTestDb()
  return env.initialise(testDb)
})

afterEach(() => env.cleanup(testDb))

jest.mock('../../../server/auth/hash', () => ({
  generate: (password, cb) => cb(null, 'FakeHash')
}))

test('createUser', () => {
  return usersDb.createUser('Jeff', 'mynamejeff', testDb)
    .then(id => {
      expect(id).toEqual([2])
    })
})

test('createUser db error', () => {
  return usersDb.createUser('Jeff', 'mynamejeff')
    .then(actual => expect(actual).toBeFalsy())
    .catch(err => expect(err).toBeTruthy())
})

test('userExists (true)', () => {
  return usersDb.userExists('symeshjb', testDb)
    .then(actual => expect(actual).toBe(true))
    .catch(err => expect(err).toBeFalsy())
})

test('userExists (false)', () => {
  return usersDb.userExists('jeffTheMeme', testDb)
    .then(actual => expect(actual).toBe(false))
    .catch(err => expect(err).toBeFalsy())
})

test('userExists db error', () => {
  return usersDb.userExists('symeshjb')
  .then(actual => expect(actual).toBeFalsy())
  .catch(err => expect(err).toBeTruthy())
})

test('getUserByName', () => {
  return usersDb.getUserByName('symeshjb', testDb)
    .then(user => {
      expect(user.user_id).toBe(1)
      expect(user.user_name).toBe('symeshjb')
      expect(user.gold).toBe(10000)
    })
})

test('getUserByName db error', () => {
  return usersDb.getUserByName('jeffTheMeme')
  .then(actual => expect(actual).toBeFalsy())
  .catch(err => expect(err).toBeTruthy())
})
