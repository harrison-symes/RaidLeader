const request = require('supertest')

const env = require('./test-environment')
const playerDb = require('../../../server/db/player')

// Manage the test database

let testDb = null
beforeEach(() => {
  testDb = env.getTestDb()
  return env.initialise(testDb)
})
afterEach(() => env.cleanup(testDb))

test('getWeaponById', () => {
  const expected = {
    "id": 1,
    "is_weapon": 1,
    "level": 1,
    "name": "Dragon Scale",
    "user_id": 1,
  }
  return playerDb.getWeaponById(1, testDb)
    .then(actual => {
      expect(actual).toEqual(expected)
    })
})

test('getWeaponById (error)', () => {
  return playerDb.getWeaponById(1)
    .then(actual => {
      expect(actual).toBeFalsy()
    })
    .catch(err => {
      expect(err).toBeTruthy()
    })
})


test('getPlayerGold', () => {
  const expected = {
    gold: 10000
  }
  return playerDb.getPlayerGold(1, testDb)
    .then(actual => {
      expect(actual).toEqual(expected)
    })
})

test('getPlayerGold (error)', () => {
  return playerDb.getPlayerGold(1)
    .then(actual => {
      expect(actual).toBeFalsy()
    })
    .catch(err => {
      expect(err).toBeTruthy()
    })
})

test('updatePlayerGold', () => {
  const expected = {
    gold: 200
  }
  return playerDb.updatePlayerGold(1, 200, testDb)
    .then(actual => {
      return testDb.select('gold').from('users').where({user_id: 1}).first()
    })
    .then(actual => {
      expect(actual).toEqual(expected)
    })
    .catch(err => expect(err).toBeFalsy())
})

test('updatePlayerGold (error)', () => {
  return playerDb.updatePlayerGold(1)
    .then(actual => {
      expect(actual).toBeFalsy()
    })
    .catch(err => {
      expect(err).toBeTruthy()
    })
})

test('addWeapon', () => {
  return testDb('inventory')
    .then(weapons => {
      const actualLength = weapons.length
      return playerDb.addWeapon(1, 'TEST WEAPON', 1, testDb)
        .then(weapon => {
          expect(weapon).toEqual({
            "id": actualLength + 1,
            "is_weapon": 1,
            "level": 1,
            "name": "TEST WEAPON",
            "user_id": 1,
          })
        })
    })
})

test('addWeapon (error)', () => {
  return playerDb.addWeapon(1)
    .then(actual => {
      expect(actual).toBeFalsy()
    })
    .catch(err => {
      expect(err).toBeTruthy()
    })
})

test('getWeapons', () => {
  return playerDb.getWeapons(1, testDb)
    .then(actual => {
      expect(actual).toHaveLength(8)
      actual.forEach(weapon => {
        expect(weapon.is_weapon).toBeTruthy()
        expect(weapon.user_id).toBe(1)
      })
    })
})

test('getWeapons (error)', () => {
  return playerDb.getWeapons(1)
    .then(actual => {
      expect(actual).toBeFalsy()
    })
    .catch(err => {
      expect(err).toBeTruthy()
    })
})

test('delWeapon', () => {
  return playerDb.delWeapon(1, testDb)
    .then(actual => {
      expect(actual).toBe(1)
      return testDb('inventory').where({id: 1}).first()
        .then(actual => {
          expect(actual).toBeFalsy()
        })
    })
})

test('delWeapon (error)', () => {
  return playerDb.delWeapon(1)
    .then(actual => {
      expect(actual).toBeFalsy()
    })
    .catch(err => {
      expect(err).toBeTruthy()
    })
})
