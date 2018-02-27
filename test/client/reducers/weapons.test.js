import reducer from '../../../client/reducers/weapons'

test('weapons initial state', () => {
  expect(reducer(undefined, {})).toEqual([])
})

test('LOGOUT', () => {
  const actual = reducer([{}, {}], {
    type: 'LOGOUT'
  })
  expect(actual).toEqual([])
})

test('RECEIVE_WEAPONS', () => {
  const actual = reducer([], {
    type: 'RECEIVE_WEAPONS',
    weapons: [{}, {}]
  })
  expect(actual).toEqual([{}, {}])
})

test('ADD_WEAPON', () => {
  const actual = reducer([], {
    type: 'ADD_WEAPON',
    weapon: {id: 1, name: 'Test Weapon'}
  })
  expect(actual).toEqual([
    {id: 1, name: 'Test Weapon'}
  ])
})
