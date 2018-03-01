import reducer from '../../../client/reducers/recruits'

test('initial state recruits', () => {
  expect(reducer(undefined, {})).toEqual([])
})

test('LOGOUT', () => {
  const actual = reducer([{}, {}], {
    type: 'LOGOUT'
  })
  expect(actual).toEqual([])
})

test('RECEIVE_RECRUITS', () => {
  const actual = reducer([], {
    type: 'RECEIVE_RECRUITS',
    recruits: [{}, {}]
  })
  expect(actual).toEqual([{}, {}])
})

test('ADD_RECRUIT', () => {
  const actual = reducer([{id: 1}], {
    type: 'ADD_RECRUIT',
    recruit: {id: 2}
  })
  expect(actual).toEqual([
    {id:1}, {id: 2}
  ])
})

test('RECRUIT_EQUIP_WEAPON (no recruit)', () => {
  const actual = reducer([], {
    type: "RECRUIT_EQUIP_WEAPON"
  })
  expect(actual).toEqual([])
})

test('RECRUIT_EQUIP_WEAPON (no match recruit)', () => {
  const initial = [{id: 1, name: 'Jeff'}]
  const actual = reducer(initial, {
    type: "RECRUIT_EQUIP_WEAPON",
    recruit: {id: 2, name: 'Not-Jeff'}
  })
  expect(actual).toEqual(initial)
})

test('RECRUIT_EQUIP_WEAPON', () => {
  const initial = [
    {id: 1, name: 'Jeff', weapon_id: null},
    {id: 2, name: 'Not-Jeff', weapon_id: 1}
  ]
  const actual = reducer(initial, {
    type: 'RECRUIT_EQUIP_WEAPON',
    recruit: {id: 1, name: 'Jeff', weapon_id: null},
    weapon_id: 3
  })
  expect(actual).toEqual([
    {id: 1, name: 'Jeff', weapon_id: 3},
    {id: 2, name: 'Not-Jeff', weapon_id: 1},
  ])
})

test('UPDATE_RECRUIT (no recruit)', () => {
  const initial = [
    {id: 1, name: 'Jeff', weapon_id: null},
    {id: 2, name: 'Not-Jeff', weapon_id: 1}
  ]
  const actual = reducer(initial, {
    type: 'UPDATE_RECRUIT',
    recruit: null
  })
  expect(actual).toEqual(initial)
})

test('UPDATE_RECRUIT (with data)', () => {
  const initial = [
    {id: 1, level: 1},
    {id: 2, level: 1}
  ]
  const actual = reducer(initial, {
    type: 'UPDATE_RECRUIT',
    recruit: {id: 1, level: 2}
  })
  expect(actual).toEqual([
    {id: 1, level: 2},
    {id: 2, level: 1}
  ])
})
