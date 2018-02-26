import reducer from '../../../client/reducers/gold'

const initialState = 0

test('gold Initial State', () => {
  const actual = reducer(undefined, {})
  expect(actual).toEqual(initialState)
})

test('LOGOUT', () => {
  expect(reducer(200, {type: 'LOGOUT'})).toBe(initialState)
})

test('RECEIVE_PLAYER_GOLD', () => {
  const actual = reducer(0,
  {
    type: 'RECEIVE_PLAYER_GOLD',
    gold: 200
  })
  expect(actual).toBe(200)
})

test('EARN_GOLD_REWARD', () => {
  const actual = reducer(200,
  {
    type: 'EARN_GOLD_REWARD',
    gold: 200
  })
  expect(actual).toBe(400)
})
