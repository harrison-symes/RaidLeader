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
  generate: (password, cb) => cb({message: 'TEST ERROR'})
}))

test('create User compare error', () => {
  usersDb.createUser('Jeff', 'mynamejeff', testDb)
    .then(actual => expect(actual).toBeFalsy())
    .catch(erro => expect(erro).toBeTruthy())
})
