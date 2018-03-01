import reducer from '../../../client/reducers/started'

test('started initial state', () => {
  expect(reducer(undefined, {})).toBe(false)
})

test('LOGOUT', () => {
  const actual = reducer(true,
  {
    type: 'LOGOUT'
  })
  expect(actual).toBe(false)
})

test('TRAVEL_TO_TOWN', () => {
  const actual = reducer(true,
  {
    type: 'TRAVEL_TO_TOWN'
  })
  expect(actual).toBe(false)
})

test('START', () => {
  const actual = reducer(false,
  {
    type: 'START'
  })
  expect(actual).toBe(true)
})

test('STOP', () => {
  const actual = reducer(true,
  {
    type: 'STOP'
  })
  expect(actual).toBe(false)
})

test('GAME_WON', () => {
  const actual = reducer(true,
  {
    type: 'GAME_WON'
  })
  expect(actual).toBe(false)
})

test('GAME_LOST', () => {
  const actual = reducer(true,
  {
    type: 'GAME_LOST'
  })
  expect(actual).toBe(false)
})
