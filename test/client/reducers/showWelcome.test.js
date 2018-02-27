import reducer from '../../../client/reducers/showWelcome'

test('showWelcome initial State', () => {
  expect(reducer(undefined, {})).toBe(false)
})

test('LOGOUT', () => {
  const actual = reducer(true, {
    type: 'LOGOUT'
  })
  expect(actual).toBe(false)
})

test('RECEIVE_RECRUITS (none)', () => {
  const actual = reducer(false, {
    type: 'RECEIVE_RECRUITS',
    recruits: []
  })
  expect(actual).toBe(true)
})

test('RECEIVE_RECRUITS (some)', () => {
  const actual = reducer(false, {
    type: 'RECEIVE_RECRUITS',
    recruits: [{}, {}]
  })
  expect(actual).toBe(false)
})

test('GET_STARTED', () => {
  const actual = reducer(true, {
    type: 'GET_STARTED'
  })
  expect(actual).toBe(false)
})
