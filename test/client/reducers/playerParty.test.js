import reducer from '../../../client/reducers/playerParty'

const initialState = []

test('playerParty initial state', () => {
  const actual = reducer(undefined, {})
  expect(actual).toEqual(initialState)
})

test('LOGOUT', () => {
  const actual = reducer([{}, {}, {}],
    {type: 'LOGOUT'}
  )
  expect(actual).toEqual(initialState)
})

test('RECRUIT_EQUIP_WEAPON', () => {
  const actual = reducer(
    [
      {
        name: 'Jeff',
        id: 1,
        weapon_id: null
      }, {
        name: 'Not-Jeff',
        id: 2,
        weapon_id: 2
      }
    ],
    {
      type: 'RECRUIT_EQUIP_WEAPON',
      recruit: {
        id: 1
      },
      weapon_id: 1
    }
  )
  expect(actual).toEqual([
    {name: 'Jeff', id: 1, weapon_id: 1},
    {name: 'Not-Jeff', id: 2, weapon_id: 2}
  ])
})

jest.mock('../../../client/utils/createClass', () => ({id, name}) => ({
  id,
  name
}))

test('RETURN_TO_MENU', () => {
  const initial = [{id: 1, name: 'Jeff'}, {id: 2, name: 'Not-Jeff'}]
  const actual = reducer(initial,
  {
    type: 'RETURN_TO_MENU'
  })
  expect(actual).not.toBe(initial)
  expect(actual).toEqual(initial)
})

test('TRAVEL_TO_TOWN', () => {
  const actual = reducer([{}, {}, {}], {type: 'TRAVEL_TO_TOWN'})
  expect(actual).toEqual(initialState)
})

test('ADD_RECRUIT_TO_PARTY', () => {
  const initial = [
    {id: 1, name: 'Jeff'},
    {id: 2, name: 'Not-Jeff'}
  ]
  const actual = reducer(initial, {
    type: 'ADD_RECRUIT_TO_PARTY',
    idx: 1,
    recruit: {id: 3, name: 'Channing Tatum'}
  })
  expect(actual).toHaveLength(3)
  expect(actual.findIndex(item => item.id == 1)).toBe(0)
  expect(actual.findIndex(item => item.id == 2)).toBe(2)
  expect(actual.findIndex(item => item.id == 3)).toBe(1)
  expect(actual.find(item => item.id == 3 && item.name == 'Channing Tatum')).toBeTruthy()
})

test('REMOVE_RECRUIT_FROM_PARTY', () => {
  const initial = [
    {id: 1, name: 'Jeff'},
    {id: 2, name: 'Not-Jeff'},
    {id: 3, name: 'Channing Tatum'}
  ]
  const actual = reducer(initial, {
    type: 'REMOVE_RECRUIT_FROM_PARTY',
    recruit: {id: 2, name: 'Not Jeff'}
  })
  expect(actual).toHaveLength(2)
  expect(actual.findIndex(item => item.id == 1)).toBe(0)
  expect(actual.findIndex(item => item.id == 2)).toBe(-1)
  expect(actual.findIndex(item => item.id == 3)).toBe(1)
  expect(actual.find(item => item.id == 2 && item.name == 'Not Jeff')).toBeFalsy()
})

test('SHIFT_PARTY_INDEX', () => {
  const initial = [
    {id: 1, name: 'Jeff'},
    {id: 2, name: 'Not-Jeff'},
    {id: 3, name: 'Channing Tatum'}
  ]
  const actual = reducer(initial, {
    type: 'SHIFT_PARTY_INDEX',
    recruit: {id: 1, name: 'Jeff'},
    idx: 2
  })
  expect(actual).toHaveLength(3)
  expect(actual.findIndex(item => item.id == 1)).toBe(2)
  expect(actual.findIndex(item => item.id == 2)).toBe(0)
  expect(actual.findIndex(item => item.id == 3)).toBe(1)

  const actual2 = reducer(actual, {
    type: 'SHIFT_PARTY_INDEX',
    recruit: {id: 3, name: 'Channing Tatum'},
    idx: 0
  })
  expect(actual2.findIndex(item => item.id == 1)).toBe(2)
  expect(actual2.findIndex(item => item.id == 2)).toBe(1)
  expect(actual2.findIndex(item => item.id == 3)).toBe(0)
})

test('REPLACE_RECRUIT_IN_PARTY', () => {
  const initial = [
    {id: 1, name: 'Jeff'},
    {id: 2, name: 'Not-Jeff'},
    {id: 3, name: 'Channing Tatum'}
  ]
  const actual = reducer(initial, {
    type: 'REPLACE_RECRUIT_IN_PARTY',
    idx: 2,
    recruit: {id: 4, name: 'The Real Jeff'}
  })
  expect(actual).toHaveLength(3)
  expect(actual.find(item => item.id == 1)).toBeTruthy()
  expect(actual.find(item => item.id == 3)).toBeFalsy()
  expect(actual.find(item => item.id == 4)).toBeTruthy()
  expect(actual.find(item => item.id == 2)).toBeTruthy()
  expect(actual.findIndex(item => item.id == 4 && item.name == 'The Real Jeff')).toBe(2)
})
