const request = require('supertest')

const env = require('./test-environment')
// const greetingsDb = require('../../server/db/greeting')

// Manage the test database

let testDb = null
beforeEach(() => {
  testDb = env.getTestDb()
  return env.initialise(testDb)
})
afterEach(() => env.cleanup(testDb))

// Tests

// test('read greetings db', () => {
//   return greetingsDb.getGreetings(testDb)
//     .then(greetings => {
//       expect(greetings.length).toBe(3)
//       expect(greetings[0].hasOwnProperty('text')).toBeTruthy()
//     })
// })
