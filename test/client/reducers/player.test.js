import reducer from '../../../client/reducers/player'

const fakeSpells = [
  {
    id: 1,
    name: 'TEST_SPELL_1',
    onCooldown: false
  },
  {
    id: 2,
    name: 'TEST_SPELL_2',
    onCooldown: false
  }
]

const fakeState = {
  id: 0,
  name: 'Test Player',
  initHp: 100,
  hp: 100,
  initPower: 20,
  power: 20,
  maxMana: 100,
  mana: 100,
  manaRegen: 1,
  isCasting: false,
  isAlive: true,
  spells: fakeSpells,
  bonusEffect: 'test_weapon_effect',
  level: 1,
  fatigue: 0
}

const fakeProgressState = {
  id: 0,
  name: 'Test Player',
  initHp: 100,
  hp: 80,
  initPower: 20,
  power: 20,
  maxMana: 100,
  mana: 80,
  manaRegen: 1,
  isCasting: false,
  isAlive: true,
  spells: [{
    id: 1,
    name: 'TEST_SPELL_1',
    onCooldown: false
  },
  {
    id: 2,
    name: 'TEST_SPELL_2',
    onCooldown: true
  }],
  bonusEffect: 'test_weapon_effect',
  level: 1,
  fatigue: 0
}

test('player initial state', () => {
  expect(reducer(undefined, {})).toBe(null)
})

test('LOGOUT', () => {
  const actual = reducer(fakeState, {
    type: 'LOGOUT'
  })
  expect(actual).toBe(null)
})

test('RETURN_TO_MENU', () => {
  const actual = reducer(fakeProgressState, {
    type: 'RETURN_TO_MENU'
  })
  const expected = {...fakeState}
  fakeState.spells = []
  expect(actual).toEqual(fakeState)
})

test('TRAVEL_TO_TOWN', () => {
  const actual = reducer(fakeProgressState, {
    type: 'TRAVEL_TO_TOWN'
  })
  const expected = {...fakeState}
  fakeState.spells = []
  expect(actual).toEqual(fakeState)
})

test('LOAD_GAME', () => {
  const actual = reducer(undefined, {
    type: 'LOAD_GAME',
    name: 'Test Player',
    playerWeapon: {
      hp: 100,
      mana: 100,
      power: 20,
      manaRegen: 1,
      level: 1,
      bonusEffect: 'test_weapon_effect'
    },
    playerSpells: fakeSpells
  })
  const expected = {...fakeState}
  expected.spells = fakeSpells
  expect(actual).toEqual(expected)
})

test('TICK_ONE_SECOND (low mana)', () => {
  const actual = reducer(fakeProgressState, {
    type: 'TICK_ONE_SECOND'
  })
  const expected = {...fakeProgressState}
  expected.mana+=expected.manaRegen
  expect(actual).toEqual(expected)
})

test('TICK_ONE_SECOND (max mana)', () => {
  const actual = reducer(fakeState, {
    type: 'TICK_ONE_SECOND'
  })
  expect(actual).toEqual(fakeState)
})

test('HEAL_FRIENDLY_TARGET (no target)', () => {
  const actual = reducer(fakeProgressState, {
    type: 'HEAL_FRIENDLY_TARGET'
  })
  expect(actual).toEqual(fakeProgressState)
})

test('HEAL_FRIENDLY_TARGET (no target)', () => {
  const actual = reducer(fakeProgressState, {
    type: 'HEAL_FRIENDLY_TARGET',
    target: {id: 20, name: 'NOT Player'}
  })
  expect(actual).toEqual(fakeProgressState)
})

test('HEAL_FRIENDLY_TARGET (low health)', () => {
  const actual = reducer(fakeProgressState, {
    type: 'HEAL_FRIENDLY_TARGET',
    target: {
      id: 0
    },
    power: 10
  })
  const expected = {...fakeProgressState}
  expected.hp+= 10
  expect(actual).toEqual(expected)
})

test('HEAL_FRIENDLY_TARGET (max)', () => {
  const actual = reducer(fakeState, {
    type: 'HEAL_FRIENDLY_TARGET',
    target: {
      id: 0
    },
    power: 10
  })
  expect(actual).toEqual(fakeState)
})

test('HEAL_FRIENDLY_TARGET (not player target)', () => {
  const actual = reducer(fakeProgressState, {
    type: 'HEAL_FRIENDLY_TARGET',
    target: {
      id: 1
    },
    power: 10
  })
  expect(actual).toEqual(fakeProgressState)
})

test('HEAL_ALL_FRIENDLY (low health)', () => {
  const actual = reducer(fakeProgressState, {
    type: 'HEAL_ALL_FRIENDLY',
    power: 10
  })
  const expected = {...fakeProgressState}
  expected.hp += 10
  expect(actual).toEqual(expected)
})

test('HEAL_ALL_FRIENDLY (max health)', () => {
  const actual = reducer(fakeState, {
    type: 'HEAL_ALL_FRIENDLY',
    power: 10
  })
  expect(actual).toEqual(fakeState)
})

test('START_CASTING', () => {
  const actual = reducer(fakeState, {
    type: 'START_CASTING'
  })
  const expected = {...fakeState}
  expected.isCasting = true
  expect(actual).toEqual(expected)
})

test('CAST_SPELL', () => {
  const initial = {...fakeState}
  initial.isCasting = true

  const expected = {...initial}
  expected.isCasting = false
  expected.mana-=10

  const actual = reducer(initial, {
    type: 'CAST_SPELL',
    spell: {
      cost: 10
    }
  })

  expect(actual).toEqual(expected)
})

test('HEAL_PLAYER (low health)', () => {
  const actual = reducer(fakeProgressState, {
    type: 'HEAL_PLAYER',
    power: 10
  })
  const expected = {...fakeProgressState}
  expected.hp += 10
  expect(actual).toEqual(expected)
})

test('HEAL_PLAYER (max health)', () => {
  const actual = reducer(fakeState, {
    type: 'HEAL_PLAYER',
    power: 10
  })
  expect(actual).toEqual(fakeState)
})

test('DAMAGE_PLAYER (above 0)', () => {
  const actual = reducer(fakeProgressState, {
    type: 'DAMAGE_PLAYER',
    power: 50
  })
  const expected = {...fakeProgressState}
  expected.hp-= 50
  expect(actual).toEqual(expected)
})

test('DAMAGE_PLAYER (below 0)', () => {
  const actual = reducer(fakeProgressState, {
    type: 'DAMAGE_PLAYER',
    power: 500
  })
  const expected = {...fakeProgressState}
  expected.hp = 0
  expect(actual).toEqual(expected)
})

test('DAMAGE_ALL_FRIENDLY (above 0)', () => {
  const actual = reducer(fakeProgressState, {
    type: 'DAMAGE_ALL_FRIENDLY',
    power: 50
  })
  const expected = {...fakeProgressState}
  expected.hp-= 50
  expect(actual).toEqual(expected)
})

test('DAMAGE_ALL_FRIENDLY (below 0)', () => {
  const actual = reducer(fakeProgressState, {
    type: 'DAMAGE_ALL_FRIENDLY',
    power: 500
  })
  const expected = {...fakeProgressState}
  expected.hp = 0
  expect(actual).toEqual(expected)
})

test('PERCENT_DAMAGE_PLAYER (above 0)', () => {
  const actual = reducer(fakeProgressState, {
    type: 'PERCENT_DAMAGE_PLAYER',
    percentage: 0.5
  })
  const expected = {...fakeProgressState}
  expected.hp -= 50
  expect(actual).toEqual(expected)
})

test('PERCENT_DAMAGE_PLAYER (below 0)', () => {
  const initial = {...fakeProgressState}
  initial.hp = 10
  const actual = reducer(initial, {
    type: 'PERCENT_DAMAGE_PLAYER',
    percentage: 0.5
  })
  const expected = {...initial}
  expected.hp = 0
  expect(actual).toEqual(expected)
})

test('PLAYER GAIN MANA (below max)', () => {
  const actual = reducer(fakeProgressState, {
    type: 'PLAYER_GAIN_MANA',
    power: 10
  })
  const expected = {...fakeProgressState}
  expected.mana += 10
  expect(actual).toEqual(expected)
})

test('PLAYER GAIN MANA (above max)', () => {
  const actual = reducer(fakeProgressState, {
    type: 'PLAYER_GAIN_MANA',
    power: 500
  })
  const expected = {...fakeProgressState}
  expected.mana = expected.maxMana
  expect(actual).toEqual(expected)
})

test('MAGE_START_BUFF', () => {
  const actual = reducer(fakeState, {
    type: 'MAGE_START_BUFF'
  })

  const expected = {...fakeState}
  expected.maxMana = 120
  expected.mana = 120

  expect(actual).toEqual(expected)
})

test('MAGE_START_BUFF (rounding down)', () => {
  const initial = {...fakeState}
  initial.maxMana = 106
  initial.mana = 106

  const actual = reducer(initial, {
    type: 'MAGE_START_BUFF'
  })

  const expected = {...fakeState}
  expected.maxMana = 127
  expected.mana = 127

  expect(actual).toEqual(expected)
})

test('SHAMAN_START_BUFF', () => {
  const initial = {...fakeState}
  initial.spells = [
    {id: 1, cast: 10, coolDown: 5},
    {id: 2, cast: 5, coolDown: 10},
  ]

  const actual = reducer(initial, {
    type: 'SHAMAN_START_BUFF'
  })

  const expected = {...initial}
  expected.spells = [
    {id: 1, cast: 9, coolDown: 4.5},
    {id: 2, cast: 4.5, coolDown: 9},
  ]

  expect(actual).toEqual(expected)

})

test('DAMAGE_FRIENDLY_TARGET (no target)', () => {
  const actual = reducer(fakeState, {
    type: 'DAMAGE_FRIENDLY_TARGET'
  })
  expect(actual).toEqual(fakeState)
})

test('DAMAGE_FRIENDLY_TARGET (wrong target)', () => {
  const actual = reducer(fakeState, {
    type: 'DAMAGE_FRIENDLY_TARGET',
    target: {
      id: 1
    }
  })
  expect(actual).toEqual(fakeState)
})

test('DAMAGE_FRIENDLY_TARGET (correct target)', () => {
  const actual = reducer(fakeState, {
    type: 'DAMAGE_FRIENDLY_TARGET',
    target: {
      id: 0
    },
    power: 10
  })
  const expected = {...fakeState}
  expected.hp -= 10
  expect(actual).toEqual(expected)
})
