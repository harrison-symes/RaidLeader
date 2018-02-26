import reducer from '../../../client/reducers/friendlyTarget'

const initialState = null

test('friendlyTarget Initial State', () => {
  const actual = reducer(undefined, {})
  expect(actual).toEqual(initialState)
})

test('LOGOUT', () => {
  const actual = reducer(initialState, {type: 'LOGOUT'})
  expect(actual).toEqual(initialState)
})

test('RETURN_TO_MENU', () => {
  const actual = reducer(initialState, {type: 'RETURN_TO_MENU'})
  expect(actual).toEqual(initialState)
})

test('TRAVEL_TO_TOWN', () => {
  const actual = reducer(initialState, {type: 'TRAVEL_TO_TOWN'})
  expect(actual).toEqual(initialState)
})

test('SELECT_FRIENDLY_TARGET (alive)', () => {
  const actual = reducer(
    initialState,
    {
      type: 'SELECT_FRIENDLY_TARGET',
      target: {name: 'Jeff', isAlive: true}
    }
  )
  expect(actual).toEqual({name: 'Jeff', isAlive: true})
})

test('SELECT_FRIENDLY_TARGET (dead)', () => {
  const actual = reducer(
    initialState,
    {
      type: 'SELECT_FRIENDLY_TARGET',
      target: {name: 'Jeff', isAlive: false}
    }
  )
  expect(actual).toEqual(initialState)
})

test('PALADIN_START_BUFF', () => {
  const actual = reducer(
    initialState,
    {
      type: 'PALADIN_START_BUFF',
      target: {name: 'Jeff', isAlive: true}
    }
  )
  expect(actual).toEqual({name: 'Jeff', isAlive: true})
})

test('MEMBER_DIED (target)', () => {
  const actual = reducer(
    {id: 1, name: 'Jeff'},
    {
      type: 'MEMBER_DIED',
      target: {id: 1, name: 'Jeff'}
    }
  )
  expect(actual).toEqual(initialState)
})

test('MEMBER_DIED (not target)', () => {
  const actual = reducer(
    {id: 1, name: 'Jeff'},
    {
      type: 'MEMBER_DIED',
      target: {id: 2, name: 'Not-Jeff'}
    }
  )
  expect(actual).toEqual({id: 1, name: 'Jeff'})
})
