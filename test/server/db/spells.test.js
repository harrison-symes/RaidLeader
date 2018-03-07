const env = require('./test-environment')
const spellsDb = require('../../../server/db/spells')

// Manage the test database

let testDb = null

beforeEach(() => {
  testDb = env.getTestDb()
  return env.initialise(testDb)
})

afterEach(() => env.cleanup(testDb))

test('getSpells', () => {
  const keys = [
    'id',
    'name',
    'user_id'
  ]
  return spellsDb.getSpells(1, testDb)
    .then(actual => {
      expect(actual).toHaveLength(1)
      keys.forEach(key => {
        expect(actual[0].hasOwnProperty(key)).toBeTruthy()
      })
    })
})

test('getSpells (error)', () => {
  return spellsDb.getSpells(1)
    .then(actual => expect(actual).toBeFalsy())
    .catch(err => expect(err).toBeTruthy())
})

test('addSpell', () => {
  return testDb('playerSpells')
    .then(initial => {
      return spellsDb.addSpell(1, 'TEST SPELL', testDb)
        .then(spell => {
          expect(spell).toEqual({
            id: initial.length + 1,
            name: 'TEST SPELL',
            user_id: 1
          })
          return testDb('playerSpells')
            .then(final => {
              expect(final).toHaveLength(initial.length + 1)
            })
        })
    })
    .catch(err => expect(err).toBeFalsy())
})

test('addSpell (error)', () => {
  return spellsDb.addSpell(1, 'break me')
  .then(actual => expect(actual).toBeFalsy())
  .catch(err => expect(err).toBeTruthy())
})

test('getSpellByID', () => {
  return spellsDb.getSpellByID(1, testDb)
    .then(spell => {
      expect(spell).toEqual({
        id: 1,
        name: 'Lesser Heal',
        user_id: 1
      })
    })
    .catch(err => expect(err).toBeFalsy())
})

test('getSpellByID (error)', () => {
  return spellsDb.getSpellByID(1)
  .then(actual => expect(actual).toBeFalsy())
  .catch(err => expect(err).toBeTruthy())
})

test('deleteSpell', () => {
  return testDb('playerSpells')
    .then(initial => {
      return spellsDb.deleteSpell(1, 'Lesser Heal', testDb)
        .then(actual => {
          expect(actual).toBe(1)
          return testDb('playerSpells')
            .then(final => {
              expect(final).toHaveLength(initial.length - 1)
            })
        })
    })
    .catch(err => expect(err).toBeFalsy())
})

test('deleteSpell (error)', () => {
  return spellsDb.deleteSpell(1)
  .then(actual => expect(actual).toBeFalsy())
  .catch(err => expect(err).toBeTruthy())
})
