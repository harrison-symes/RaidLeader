import reducer from '../../../client/reducers/boss'

const fakeSpells = [
  {id: 1, name: 'FAKE_SPELL_1', cast: 5, coolDown: 10, onCooldown: false},
  {id: 2, name: 'FAKE_SPELL_2', cast: 10, coolDown: 5, onCooldown: false}
]

const fakeBoss = {
  name: 'TEST_BOSS',
  initHp: 100,
  hp: 100,
  power: 20,
  mana: 0,
  maxMana: 100,
  armor: 50,
  initArmor: 50,
  isCasting: false,
  wantsToCast: false,
  spells: fakeSpells
}

const fakeProgressBoss = {
  ...fakeBoss,
  hp: 50,
  armor: 20,
  mana: 5
}

fakeProgressBoss.spells[0].onCooldown = true

test('Boss initial state', () => {
  expect(reducer(undefined, {})).toBe(null)
})

test('LOGOUT', () => {
  const actual = reducer(fakeBoss, {
    type: 'LOGOUT'
  })
  expect(actual).toBe(null)
})

test('RETURN_TO_MENU', () => {
  const actual = reducer(fakeBoss, {
    type: 'LOGOUT'
  })
  expect(actual).toBe(null)
})

test('TRAVEL_TO_TOWN', () => {
  const actual = reducer(fakeBoss, {
    type: 'TRAVEL_TO_TOWN'
  })
  expect(actual).toBe(null)
})

test('TARGET_BOSS', () => {
  const actual = reducer(undefined, {
    type: 'TARGET_BOSS',
    boss: fakeProgressBoss
  })
  expect(actual.spells[0].onCooldown).toBeFalsy()
})

test('BOSS_GAIN_ARMOR (low armor)', () => {
  const actual = reducer(fakeProgressBoss, {
    type: 'BOSS_GAIN_ARMOR',
    amount: 10
  })
  const expected = {...fakeProgressBoss}
  expected.armor += 10
  expect(actual).toEqual(expected)
})

test('BOSS_GAIN_ARMOR (max armor)', () => {
  const actual = reducer(fakeProgressBoss, {
    type: 'BOSS_GAIN_ARMOR',
    amount: 1000
  })
  const expected = {...fakeProgressBoss}
  expected.armor = expected.initArmor
  expect(actual).toEqual(expected)
})

test('BOSS_GAIN_MANA (low mana)', () => {
  const actual = reducer(fakeProgressBoss, {
    type: 'BOSS_GAIN_MANA',
    amount: 10
  })
  const expected = {...fakeProgressBoss}
  expected.mana += 10
  expect(actual).toEqual(expected)
})

test('BOSS_GAIN_MANA (max mana)', () => {
  const actual = reducer(fakeProgressBoss, {
    type: 'BOSS_GAIN_MANA',
    amount: 1000
  })
  const expected = {...fakeProgressBoss}
  expected.mana = expected.maxMana
  expect(actual).toEqual(expected)
})

test('BOSS_GAIN_POWER', () => {
  const actual = reducer(fakeProgressBoss, {
    type: 'BOSS_GAIN_POWER',
    amount: 10
  })
  const expected = {...fakeProgressBoss}
  expected.power += 10
  expect(actual).toEqual(expected)
})

test('BOSS_GAIN_POWER (below 0)', () => {
  const actual = reducer(fakeProgressBoss, {
    type: 'BOSS_GAIN_POWER',
    amount: -10000
  })
  const expected = {...fakeProgressBoss}
  expected.power = 0
  expect(actual).toEqual(expected)
})

test('HEAL_BOSS (low health)', () => {
  const actual = reducer(fakeProgressBoss, {
    type: 'HEAL_BOSS',
    power: 10
  })
  const expected = {...fakeProgressBoss}
  expected.hp += 10
  expect(actual).toEqual(expected)
})

test('HEAL_BOSS (max health)', () => {
  const actual = reducer(fakeProgressBoss, {
    type: 'HEAL_BOSS',
    power: 10000
  })
  const expected = {...fakeProgressBoss}
  expected.hp = expected.initHp
  expect(actual).toEqual(expected)
})

test('PHYSICAL_ATTACK_BOSS (with armor)', () => {
  const actual = reducer(fakeProgressBoss, {
    type: 'PHYSICAL_ATTACK_BOSS',
    power: 10
  })

  const expected = {...fakeProgressBoss}
  expected.armor-=10

  expect(actual).toEqual(expected)
})

test('PHYSICAL_ATTACK_BOSS (break armor)', () => {
  const actual = reducer(fakeProgressBoss, {
    type: 'PHYSICAL_ATTACK_BOSS',
    power: 22
  })

  const expected = {...fakeProgressBoss}
  expected.armor=0
  expected.hp-=2

  expect(actual).toEqual(expected)
})

test('PHYSICAL_ATTACK_BOSS (below 0 health)', () => {
  const actual = reducer(fakeProgressBoss, {
    type: 'PHYSICAL_ATTACK_BOSS',
    power: 200
  })

  const expected = {...fakeProgressBoss}
  expected.armor=0
  expected.hp=0

  expect(actual).toEqual(expected)
})

test('PLAYER_ATTACK_BOSS (with armor)', () => {
  const actual = reducer(fakeProgressBoss, {
    type: 'PLAYER_ATTACK_BOSS',
    power: 10
  })

  const expected = {...fakeProgressBoss}
  expected.armor-=10

  expect(actual).toEqual(expected)
})

test('PLAYER_ATTACK_BOSS (break armor)', () => {
  const actual = reducer(fakeProgressBoss, {
    type: 'PLAYER_ATTACK_BOSS',
    power: 22
  })

  const expected = {...fakeProgressBoss}
  expected.armor=0
  expected.hp-=2

  expect(actual).toEqual(expected)
})

test('PLAYER_ATTACK_BOSS (below 0 health)', () => {
  const actual = reducer(fakeProgressBoss, {
    type: 'PLAYER_ATTACK_BOSS',
    power: 200
  })

  const expected = {...fakeProgressBoss}
  expected.armor=0
  expected.hp=0

  expect(actual).toEqual(expected)
})

test('CRITICAL_ATTACK_BOSS (with armor)', () => {
  const actual = reducer(fakeProgressBoss, {
    type: 'CRITICAL_ATTACK_BOSS',
    power: 5
  })

  const expected = {...fakeProgressBoss}
  expected.hp-=10

  expect(actual).toEqual(expected)
})

test('CRITICAL_ATTACK_BOSS (break armor)', () => {
  const actual = reducer(fakeProgressBoss, {
    type: 'CRITICAL_ATTACK_BOSS',
    power: 11
  })

  const expected = {...fakeProgressBoss}
  expected.hp-=22

  expect(actual).toEqual(expected)
})

test('CRITICAL_ATTACK_BOSS (below 0 health)', () => {
  const actual = reducer(fakeProgressBoss, {
    type: 'CRITICAL_ATTACK_BOSS',
    power: 200
  })

  const expected = {...fakeProgressBoss}
  expected.hp=0

  expect(actual).toEqual(expected)
})

test('PERCENT_DAMAGE_BOSS (high health)', () => {
  const actual = reducer(fakeProgressBoss, {
    type: 'PERCENT_DAMAGE_BOSS',
    percentage: 0.1
  })
  const expected = {...fakeProgressBoss}
  expected.hp-= (expected.hp * 0.1)
  expect(actual).toEqual(expected)
})

test('PERCENT_DAMAGE_BOSS (below 0)', () => {
  const actual = reducer(fakeProgressBoss, {
    type: 'PERCENT_DAMAGE_BOSS',
    percentage: 1.1
  })
  const expected = {...fakeProgressBoss}
  expected.hp = 0
  expect(actual).toEqual(expected)
})

test('BOSS_WANTS_TO_CAST', () => {
  const actual = reducer(fakeProgressBoss, {
    type: 'BOSS_WANTS_TO_CAST',
    spell: fakeSpells[0]
  })
  expect(actual.wantsToCast).toBe(fakeSpells[0].name)
})

test('BOSS_START_CASTING (no spell)', () => {
  const actual = reducer(fakeProgressBoss, {
    type: 'BOSS_START_CASTING',
    spell: null
  })
  expect(actual).toEqual(fakeProgressBoss)
})

test('BOSS_START_CASTING (not a boss spell)', () => {
  const actual = reducer(fakeProgressBoss, {
    type: 'BOSS_START_CASTING',
    spell: {name: 'Jeff Spell'}
  })
  expect(actual).toEqual(fakeProgressBoss)
})

test('BOSS_START_CASTING', () => {
  const actual = reducer(fakeBoss, {
    type: 'BOSS_START_CASTING',
    spell: fakeSpells[0]
  })
  const expected = {...fakeBoss}
  expected.isCasting = true
  expect(actual).toEqual(expected)
})

test('BOSS_FINISH_CASTING', () => {
  const initial = {...fakeBoss,
    isCasting: true,
    wantsToCast: fakeSpells[0].name
  }
  const actual = reducer(initial, {
    type: 'BOSS_FINISH_CASTING',
    spell: {name: 'FAKE_SPELL_1'}
  })
  const expected = {...fakeBoss}
  expected.isCasting = false
  expected.wantsToCast = null
  expected.mana -= fakeSpells[0].cost
  expect(actual.spells[0].onCooldown).toBeTruthy()
  expect(actual).toEqual(expected)
})

test('BOSS_SPELL_FINISH_COOLDOWN', () => {
  
})
