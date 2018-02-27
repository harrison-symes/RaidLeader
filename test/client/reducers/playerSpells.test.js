import reducer from '../../../client/reducers/playerSpells'

const initialState = []

test('playerSpells initial state', () => {
  const actual = reducer(undefined, {})
  expect(actual).toEqual(initialState)
})

test('LOGOUT', () => {
  const actual = reducer([{}, {}, {}],
    {type: 'LOGOUT'}
  )
  expect(actual).toEqual(initialState)
})

test('TRAVEL_TO_TOWN', () => {
  const actual = reducer([{}, {}, {}], {type: 'TRAVEL_TO_TOWN'})
  expect(actual).toEqual(initialState)
})

test('ADD_SPELL_TO_BAR', () => {
  const initial = [
    {id: 1, name: 'Jeff'},
    {id: 2, name: 'Not-Jeff'}
  ]
  const actual = reducer(initial, {
    type: 'ADD_SPELL_TO_BAR',
    idx: 1,
    spell: {id: 3, name: 'Channing Tatum'}
  })
  expect(actual).toEqual([
    {id: 1, name: 'Jeff'},
    {id: 3, name: 'Channing Tatum'},
    {id: 2, name: 'Not-Jeff'}
  ])
})

test('REMOVE_SPELL_FROM_BAR', () => {
  const initial = [
    {id: 1, name: 'Jeff'},
    {id: 2, name: 'Not-Jeff'}
  ]
  const actual = reducer(initial,
  {
    type: 'REMOVE_SPELL_FROM_BAR',
    spell: {id: 1, name: 'Jeff'}
  })
  expect(actual).toHaveLength(1)
  expect(actual.find(item => item.id == 1)).toBeFalsy()
  expect(actual).toEqual([
    {id: 2, name: 'Not-Jeff'}
  ])
})

test('SHIFT_SPELL_INDEX', () => {
  const initial = [
    {id: 1, name: 'Jeff'},
    {id: 3, name: 'Channing Tatum'},
    {id: 2, name: 'Not-Jeff'}
  ]
  const actual = reducer(initial,
  {
    type: 'SHIFT_SPELL_INDEX',
    spell: {id: 1, name: 'Jeff'},
    idx: 2
  })
  expect(actual).toHaveLength(initial.length)
  expect(actual).toEqual([
    {id: 3, name: 'Channing Tatum'},
    {id: 2, name: 'Not-Jeff'},
    {id: 1, name: 'Jeff'}

  ])
})

test('REPLACE_SPELL_IN_BAR', () => {
  const initial = [
    {id: 1, name: 'Jeff'},
    {id: 3, name: 'Channing Tatum'},
    {id: 2, name: 'Not-Jeff'}
  ]
  const actual = reducer(initial,
    {
      type: 'REPLACE_SPELL_IN_BAR',
      spell: {id: 4, name: 'Meme Man'},
      idx: 1
    })
  expect(actual).toHaveLength(initial.length)
  expect(actual).toEqual([
    {id: 1, name: 'Jeff'},
    {id: 4, name: 'Meme Man'},
    {id: 2, name: 'Not-Jeff'}
  ])
})
