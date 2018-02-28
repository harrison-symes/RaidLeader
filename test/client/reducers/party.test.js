import reducer from '../../../client/reducers/party'
import clone from 'clone'

const template = [
  {id: 1, effects: [], isAlive: true, name: 'Jeff', initHp: 50, hp: 25},
  {id: 2, effects: [], isAlive: true, name: 'Not-Jeff', initHp: 60, hp: 51},
  {id: 3, effects: [], isAlive: true, name: 'Channing Tatum', initHp: 70, hp: 70},
  {id: 4, effects: [], isAlive: false, name: 'Dead-Jeff', initHp: 60, hp: 0},
]

let fakeParty

beforeEach(() => {
  fakeParty = clone(template)
})

test('party initial state', () => {
  expect(reducer(undefined, {})).toEqual([])
})



test('LOGOUT', () => {
  const actual = reducer(fakeParty, {
    type: 'LOGOUT'
  })
  expect(actual).toEqual([])
})

test('RETURN_TO_MENU', () => {
  const actual = reducer(fakeParty, {
    type: 'RETURN_TO_MENU'
  })
  expect(actual).toEqual([])
})

test('TRAVEL_TO_TOWN', () => {
  const actual = reducer(fakeParty, {
    type: 'TRAVEL_TO_TOWN'
  })
  expect(actual).toEqual([])
})

test('LOAD_GAME', () => {
  const actual = reducer([], {
    type: 'LOAD_GAME',
    playerParty: fakeParty
  })
  expect(actual).toEqual(fakeParty)
})

test('HEAL_FRIENDLY_TARGET (no target)', () => {
  const actual = reducer(fakeParty, {
    type: 'HEAL_FRIENDLY_TARGET',
    target:null
  })
  expect(actual).toEqual(fakeParty)
})

test('HEAL_FRIENDLY_TARGET (no target match)', () => {
  const actual = reducer(fakeParty, {
    type: 'HEAL_FRIENDLY_TARGET',
    target: {id: 0, name: 'THE PLAYER'}
  })
  expect(actual).toEqual(fakeParty)
})

test('HEAL_FRIENDLY_TARGET (no overheal)', () => {
  const actual = reducer(fakeParty, {
    type: 'HEAL_FRIENDLY_TARGET',
    target: fakeParty[0],
    power: 10
  })
  expect(actual[0].hp).toBe(35)
})

test('HEAL_FRIENDLY_TARGET ( partial overheal)', () => {
  const actual = reducer(fakeParty, {
    type: 'HEAL_FRIENDLY_TARGET',
    target: fakeParty[1],
    power: 10
  })
  expect(actual[1].hp).toBe(60)
})

test('HEAL_FRIENDLY_TARGET ( overheal)', () => {
  const actual = reducer(fakeParty, {
    type: 'HEAL_FRIENDLY_TARGET',
    target: fakeParty[2],
    power: 10
  })
  expect(actual[2].hp).toBe(70)
})

test('HEAL_FRIENDLY_TARGET ( dead target)', () => {
  const actual = reducer(fakeParty, {
    type: 'HEAL_FRIENDLY_TARGET',
    target: fakeParty[3],
    power: 10
  })
  expect(actual[3].hp).toBe(0)
})

test('HEAL_ALL_FRIENDLY', () => {
  const initial = fakeParty.map(i => ({...i}))
  const actual = reducer(initial, {
    type: 'HEAL_ALL_FRIENDLY',
    power: 10
  })
  expect(actual[0].hp).toBe(35)
  expect(actual[1].hp).toBe(60)
  expect(actual[2].hp).toBe(70)
  expect(actual[3].hp).toBe(0)
})

test('ADD_EFFECT_TO_TARGET', () => {
  const fakeEffect = {name: 'TEST EFFECT'}
  const actual = reducer(fakeParty, {
    type: 'ADD_EFFECT_TO_TARGET',
    target: fakeParty[0],
    effect: fakeEffect
  })
  expect(actual[0].effects).toHaveLength(1)
  expect(actual[0].effects[0]).toEqual(fakeEffect)
})

test('ADD_EFFECT_TO_TARGET (duplicate)', () => {
  const fakeEffectOne = {other: 1, name: 'TEST EFFECT'}
  const fakeEffectTwo = {other: 2, name: 'TEST EFFECT'}
  fakeParty[0].effects.push(fakeEffectOne)
  const actual = reducer(fakeParty, {
    type: 'ADD_EFFECT_TO_TARGET',
    target: fakeParty[0],
    effect: fakeEffectTwo
  })
  expect(actual[0].effects).toHaveLength(1)
  expect(actual[0].effects[0]).toEqual(fakeEffectTwo)
  expect(actual[0].effects[0]).not.toEqual(fakeEffectOne)
})

test('ADD_EFFECT_TO_TARGET (multiple)', () => {
  const fakeEffectOne = {other: 1, name: 'TEST EFFECT'}
  const fakeEffectTwo = {other: 2, name: 'TEST EFFECT TWO'}
  fakeParty[0].effects.push(fakeEffectOne)
  const actual = reducer(fakeParty, {
    type: 'ADD_EFFECT_TO_TARGET',
    target: fakeParty[0],
    effect: fakeEffectTwo
  })
  expect(actual[0].effects).toHaveLength(2)
  expect(actual[0].effects[0]).toEqual(fakeEffectOne)
  expect(actual[0].effects[1]).toEqual(fakeEffectTwo)
})

test('ADD_EFFECT_TO_TARGET (wrong target)', () => {
  const fakeEffect = {other: 1, name: 'TEST EFFECT'}
  const actual = reducer(fakeParty, {
    type: 'ADD_EFFECT_TO_TARGET',
    target: {id: 0, name: 'PLAYER'},
    effect: fakeEffect
  })
  expect(actual).toEqual(fakeParty)
})

test('ADD_EFFECT_TO_TARGET (no target)', () => {
  const fakeEffect = {other: 1, name: 'TEST EFFECT'}
  const actual = reducer(fakeParty, {
    type: 'ADD_EFFECT_TO_TARGET',
    target: null,
    effect: fakeEffect
  })
  expect(actual).toEqual(fakeParty)
})

test('ADD_EFFECT_TO_ALL_FRIENDLY', () => {
  const fakeEffect = {other: 1, name: 'TEST EFFECT'}
  const fakeEffectTwo = {other: 2, name: 'TEST_EFFECT_TWO'}
  fakeParty[0].effects.push(fakeEffectTwo)
  fakeParty[1].effects.push(fakeEffect)
  const actual = reducer(fakeParty, {
    type: 'ADD_EFFECT_TO_ALL_FRIENDLY',
    effect: fakeEffect
  })

  expect(actual[0].effects).toHaveLength(2)
  expect(actual[0].effects[0]).toEqual(fakeEffectTwo)
  expect(actual[0].effects[1]).toEqual(fakeEffect)
  expect(actual[1].effects).toHaveLength(1)
  expect(actual[1].effects[0]).toEqual(fakeEffect)
  expect(actual[2].effects).toHaveLength(1)
  expect(actual[2].effects[0]).toEqual(fakeEffect)
  expect(actual[3].effects).toHaveLength(0)

})

test('REMOVE_EFFECTS_FROM_ALL', () => {
  const fakeEffect = {other: 1, name: 'TEST EFFECT'}
  const fakeEffectTwo = {other: 2, name: 'TEST_EFFECT_TWO'}
  fakeParty[0].effects.push(fakeEffectTwo)
  fakeParty[1].effects.push(fakeEffect)
  fakeParty = fakeParty.map(i => {
    i.effects.push({...fakeEffect})
    return i
  })
  fakeParty[0].effects.push(fakeEffectTwo)
  const actual = reducer(fakeParty, {
    type: 'REMOVE_EFFECTS_FROM_ALL',
  })
  actual.forEach(item => {
    expect(item.effects).toHaveLength(0)
  })

})

test('REMOVE_EFFECT_FROM_TARGET', () => {
  const fakeEffect = {other: 1, name: 'TEST EFFECT'}
  const fakeEffectTwo = {other: 2, name: 'TEST_EFFECT_TWO'}
  fakeParty[0].effects.push(fakeEffectTwo)
  fakeParty[1].effects.push(fakeEffect)
  const actual = reducer(fakeParty, {
    type: 'REMOVE_EFFECT_FROM_TARGET',
    target: fakeParty[0],
    effect: fakeEffectTwo
  })
  expect(actual[0].effects).toHaveLength(0)
  expect(actual[1].effects).toHaveLength(1)
})

test('SET_RECRUIT_PERCENTAGE', () => {
  const actual = reducer(clone(fakeParty), {
    type: 'SET_RECRUIT_PERCENTAGE',
    percentage: 10
  })

  expect(actual[0].hp / actual[0].initHp * 100).toEqual(10)
  expect(actual[1].hp / actual[1].initHp * 100).toEqual(10)
  expect(actual[2].hp / actual[2].initHp * 100).toEqual(10)

  expect(actual[3].hp).toEqual(0)
})

test('SET_RECRUIT_PERCENTAGE (100%)', () => {
  const actual = reducer(clone(fakeParty), {
    type: 'SET_RECRUIT_PERCENTAGE',
    percentage: 100
  })

  expect(actual[0].hp).toEqual(fakeParty[0].initHp)
  expect(actual[1].hp).toEqual(fakeParty[1].initHp)
  expect(actual[2].hp).toEqual(fakeParty[2].initHp)

  expect(fakeParty[3].hp).toEqual(0)
})

test('DAMAGE_ALL_FRIENDLY', () => {
  const actual = reducer(clone(fakeParty), {
    type: 'DAMAGE_ALL_FRIENDLY',
    power: 10
  })

  expect(actual[0].hp).toEqual(fakeParty[0].hp - 10)
  expect(actual[1].hp).toEqual(fakeParty[1].hp - 10)
  expect(actual[2].hp).toEqual(fakeParty[2].hp - 10)
  expect(actual[3].hp).toEqual(0)
})

test('DAMAGE_FRIENDLY_TARGET (low health)', () => {
  const actual = reducer(clone(fakeParty), {
    type: 'DAMAGE_FRIENDLY_TARGET',
    target: fakeParty[0],
    power: 10
  })
  expect(actual[0].hp).toBe(fakeParty[0].hp - 10)
  expect(actual[0].initHp).toBe(fakeParty[0].initHp)
  expect(actual[1].hp).toBe(fakeParty[1].hp)
  expect(actual[2].hp).toBe(fakeParty[2].hp)
})

// test('DAMAGE_FRIENDLY_TARGET (drop below 0 health)', () => {
//   const actual = reducer(clone(fakeParty), {
//     type: 'DAMAGE_FRIENDLY_TARGET',
//     target: fakeParty[1],
//     power: 100
//   })
//   expect(actual[0].hp).toBe(fakeParty[0].hp)
//   expect(actual[1].hp).toBe(0)
//   expect(actual[1].initHp).toBe(fakeParty[1].initHp)
//   expect(actual[2].hp).toBe(fakeParty[2].hp)
// })

test('DAMAGE_FRIENDLY_TARGET (dead target)', () => {
  const actual = reducer(clone(fakeParty), {
    type: 'DAMAGE_FRIENDLY_TARGET',
    target: fakeParty[3],
    power: 10
  })
  expect(actual).toEqual(fakeParty)
})

test('DAMAGE_FRIENDLY_TARGET (no match target)', () => {
  const actual = reducer(clone(fakeParty), {
    type: 'DAMAGE_FRIENDLY_TARGET',
    target: {id: 0, name: 'Player'},
    power: 10
  })
  expect(actual).toEqual(fakeParty)
})

test('PERCENT_DAMAGE_DAMAGE_ALL_FRIENDLY)', () => {
  const actual = reducer(clone(fakeParty), {
    type: 'PERCENT_DAMAGE_DAMAGE_ALL_FRIENDLY',
    percentage: 0.1
  })
  expect(actual[0].hp).toEqual(fakeParty[0].hp - (fakeParty[0].initHp * 0.1))
  expect(actual[1].hp).toEqual(fakeParty[1].hp - (fakeParty[1].initHp * 0.1))
  expect(actual[2].hp).toEqual(fakeParty[2].hp - (actual[2].initHp * 0.1))
  expect(fakeParty[3].hp).toEqual(0)
})


test('PERCENT_DAMAGE_FRIENDLY_TARGET(no match target)', () => {
  const actual = reducer(clone(fakeParty), {
    type: 'PERCENT_DAMAGE_FRIENDLY_TARGET',
    percentage: 0.1,
    target: {id: 0, name: 'Player'}
  })
  expect(actual).toEqual(fakeParty)
})

test('PERCENT_DAMAGE_FRIENDLY_TARGET(no target)', () => {
  const actual = reducer(clone(fakeParty), {
    type: 'PERCENT_DAMAGE_FRIENDLY_TARGET',
    percentage: 0.1,
    target: null
  })
  expect(actual).toEqual(fakeParty)
})

test('PERCENT_DAMAGE_FRIENDLY_TARGET(dead target)', () => {
  const actual = reducer(clone(fakeParty), {
    type: 'PERCENT_DAMAGE_FRIENDLY_TARGET',
    percentage: 0.1,
    target: fakeParty[3]
  })
  expect(actual).toEqual(fakeParty)
})

test('PERCENT_DAMAGE_FRIENDLY_TARGET(valid)', () => {
  const actual = reducer(clone(fakeParty), {
    type: 'PERCENT_DAMAGE_FRIENDLY_TARGET',
    percentage: 0.1,
    target: fakeParty[0]
  })
  expect(actual[0].hp).toEqual(fakeParty[0].hp - (fakeParty[0].initHp * 0.1))
})

test('PERCENT_HEAL_FRIENDLY_TARGET(no match target)', () => {
  const actual = reducer(clone(fakeParty), {
    type: 'PERCENT_HEAL_FRIENDLY_TARGET',
    percentage: 0.1,
    target: {id: 0, name: 'Player'}
  })
  expect(actual).toEqual(fakeParty)
})

test('PERCENT_HEAL_FRIENDLY_TARGET(no target)', () => {
  const actual = reducer(clone(fakeParty), {
    type: 'PERCENT_HEAL_FRIENDLY_TARGET',
    percentage: 0.1,
    target: null
  })
  expect(actual).toEqual(fakeParty)
})

test('PERCENT_HEAL_FRIENDLY_TARGET(dead target)', () => {
  const actual = reducer(clone(fakeParty), {
    type: 'PERCENT_HEAL_FRIENDLY_TARGET',
    percentage: 0.1,
    target: fakeParty[3]
  })
  expect(actual).toEqual(fakeParty)
})

test('PERCENT_HEAL_FRIENDLY_TARGET(valid)', () => {
  const actual = reducer(clone(fakeParty), {
    type: 'PERCENT_HEAL_FRIENDLY_TARGET',
    percentage: 0.1,
    target: fakeParty[0]
  })
  expect(actual[0].hp).toEqual(fakeParty[0].hp + (fakeParty[0].initHp * 0.1))
})

test('PERCENT_HEAL_FRIENDLY_TARGET (overheal)', () => {
  const actual = reducer(clone(fakeParty), {
    type: 'PERCENT_HEAL_FRIENDLY_TARGET',
    percentage: 1,
    target: fakeParty[0]
  })
  expect(actual[0].hp).toEqual(fakeParty[0].initHp)
})

test('PERCENT_HEAL_ALL_FRIENDLY', () => {
  const actual = reducer(clone(fakeParty), {
    type: 'PERCENT_HEAL_ALL_FRIENDLY',
    percentage: 0.2
  })
  expect(actual[0].hp).toEqual(fakeParty[0].hp + (fakeParty[0].initHp * 0.2))
  expect(actual[1].hp).toEqual(60)
  expect(actual[2].hp).toEqual(70)
  expect(fakeParty[3].hp).toEqual(0)
})

test('PRIEST_START_BUFF', () => {
  const actual = reducer(clone(fakeParty), {
    type: 'PRIEST_START_BUFF',
    target: fakeParty[0]
  })
  actual.forEach((item,i) => {
    if (i == 0) expect(item).toEqual(fakeParty[i])
    else expect(actual[i].initHp).toEqual(fakeParty[i].initHp * 1.1)
  })
})
