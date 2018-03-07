const env = require('./test-environment')
const recruitsDb = require('../../../server/db/recruits')

// Manage the test database

let testDb = null

beforeEach(() => {
  testDb = env.getTestDb()
  return env.initialise(testDb)
})

afterEach(() => env.cleanup(testDb))

test('getRecruits', () => {
  const keys = ['id', 'name', 'heroClass', 'level', 'weapon_id', 'zodiac', 'user_id' ]
  return recruitsDb.getRecruits(1, testDb)
    .then(actual => {
      expect(actual).toHaveLength(9)
      actual.forEach(recruit => {
        keys.forEach(key => {
          expect(recruit.hasOwnProperty(key)).toBeTruthy()
        })
      })
    })
})

test('getRecruits (error)', () => {
  return recruitsDb.getRecruits(1)
    .then(actual => expect(actual).toBeFalsy())
    .catch(err => expect(err).toBeTruthy())
})

test('equipWeapon', () => {
  return recruitsDb.equipWeapon(1, 3, testDb)
    .then(actual => {
      expect(actual).toBe(1)
      return testDb('recruits').where({id: 1}).first()
        .then(recruit => {
          expect(recruit).toEqual(      {
            "heroClass": "Paladin",
            "id": 1,
            "level": 2,
            "name": "Patrick",
            "user_id": 1,
            "weapon_id": 3,
            "zodiac": "Aries"
          })
        })
    })
})

test('equipWeapon (error)', () => {
  return recruitsDb.equipWeapon()
    .then(actual => expect(actual).toBeFalsy())
    .catch(err => expect(err).toBeTruthy())
})

test('addRecruit', () => {
  return recruitsDb.addRecruit(1, 'Test', 2, 'Paladin', 'Aries', testDb)
    .then(actual => {
      expect(actual).toEqual({
        id: 10,
        user_id: 1,
        name: 'Test',
        level: 2,
        heroClass: 'Paladin',
        zodiac: 'Aries',
        weapon_id: null
      })
    })
})

test('addRecruit (error)', () => {
  return recruitsDb.addRecruit()
    .then(actual => expect(actual).toBeFalsy())
    .catch(err => expect(err).toBeTruthy())
})

test('getRecruitById', () => {
  return recruitsDb.getRecruitById(1, testDb)
    .then(recruit => expect(recruit).toEqual({
      id: 1,
      name: 'Patrick',
      heroClass: 'Paladin',
      weapon_id: null,
      level: 2,
      user_id: 1,
      zodiac: 'Aries'
    }))
})

test('getRecruitById (error)', () => {
  return recruitsDb.getRecruitById()
    .then(actual => expect(actual).toBeFalsy())
    .catch(err => expect(err).toBeTruthy())
})

test('levelUpRecruit', () => {
  return recruitsDb.levelUpRecruit(1, 3, testDb)
    .then(recruit => expect(recruit).toEqual({
      id: 1,
      name: 'Patrick',
      heroClass: 'Paladin',
      weapon_id: null,
      level: 3,
      user_id: 1,
      zodiac: 'Aries'
    }))
})

test('levelUpRecruit (error)', () => {
  return recruitsDb.levelUpRecruit()
    .then(actual => expect(actual).toBeFalsy())
    .catch(err => expect(err).toBeTruthy())
})
