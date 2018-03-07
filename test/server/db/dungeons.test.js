const env = require('./test-environment')
const dungeonDb = require('../../../server/db/dungeons')

// Manage the test database

let testDb = null
beforeEach(() => {
  testDb = env.getTestDb()
  return env.initialise(testDb)
})
afterEach(() => env.cleanup(testDb))

test('getDungeons', () => {
  var keys = [
    'id',
    'name'
  ]
  return dungeonDb.getDungeons(testDb)
    .then(actual => {
      expect(actual).toHaveLength(6)
      actual.forEach(dungeon => {
        keys.forEach(key => {
          expect(dungeon.hasOwnProperty(key)).toBeTruthy()
        })
      })
    })
})

test('getDungeons (error)', () => {
  return dungeonDb.getDungeons()
    .then(actual => expect(actual).toBeFalsy())
    .catch(err => expect(err).toBeTruthy())
})

test('getCompletedDungeons', () => {
  var keys = ['user_id', 'dungeon_id']
  return dungeonDb.getCompletedDungeons(1, testDb)
    .then(actual => {
      expect(actual).toHaveLength(3)
      actual.forEach(dungeon => {
        keys.forEach(key => {
          expect(dungeon.hasOwnProperty(key)).toBeTruthy()
        })
      })
    })
})

test('getCompletedDungeons (error)', () => {
  return dungeonDb.getCompletedDungeons()
  .then(actual => expect(actual).toBeFalsy())
  .catch(err => expect(err).toBeTruthy())
})

test('getBosses', () => {
  const keys = ['name', 'id']
  return dungeonDb.getBosses(testDb)
    .then(actual => {
      actual.forEach(boss => {
        keys.forEach(key => {
          expect(boss.hasOwnProperty(key)).toBeTruthy()
        })
      })
      expect(actual).toHaveLength(9)
    })
})

test('getBosses (error)', () => {
  return dungeonDb.getBosses()
  .then(actual => expect(actual).toBeFalsy())
  .catch(err => expect(err).toBeTruthy())
})

test('dungeonComplete (error)', () => {
  return dungeonDb.dungeonComplete()
  .then(actual => expect(actual).toBeFalsy())
  .catch(err => expect(err).toBeTruthy())
})
