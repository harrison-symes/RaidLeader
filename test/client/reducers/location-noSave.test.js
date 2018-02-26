import reducer from '../../../client/reducers/location'

const town = {
  name: 'Town',
  type: 'Town',
  inGame: false
}

const mockClear = jest.fn()
const mockSet = jest.fn()

jest.mock('../../../client/utils/localstorage', () => ({
  get: () => (null),
  clear: () => mockClear(),
  set: () => mockSet()
}))

test('location Initial State (no save)', () => {
  const actual = reducer(undefined, {})
  expect(actual).toEqual(town)
})

test('LOGOUT', () => {

  const actual = reducer(
    town,
    {type: 'LOGOUT'}
  )
  expect(mockClear.mock.calls.length).toBe(1)
  expect(actual).toEqual(town)
})

test('START', () => {
  const actual = reducer(
    {inGame: false},
    {type: 'START'}
  )
  expect(mockSet.mock.calls.length).toBe(1)
  expect(actual).toEqual({inGame: true})

})

test('DUNGEON_CHEST_OPENED', () => {
  const initialState = {inGame: false, name: 'JEFF'}
  const actual = reducer(
    initialState,
    {type: 'DUNGEON_CHEST_OPENED'}
  )
  expect(mockSet.mock.calls.length).toBe(2)
  expect(actual).toEqual(initialState)
})

test('GAME_WON', () => {
  const mockCalls = mockSet.mock.calls.length
  const initialState = {
    inGame: true,
    bosses: [
      {name: 'Jeff', isDefeated: false},
      {name: 'Not-Jeff', isDefeated: false}
    ]
  }
  const actual = reducer(
    initialState,
    {
      type: 'GAME_WON',
      boss: {name: 'Jeff'}
    }
  )
  expect(mockSet.mock.calls.length).toBe(mockCalls + 1)
  expect(actual).toEqual({
    inGame: false,
    bosses: [
      {name: 'Jeff', isDefeated: true},
      {name: 'Not-Jeff', isDefeated: false},
    ]
  })
})

test('GAME_LOST', () => {
  const mockCalls = mockSet.mock.calls.length
  const actual = reducer(
    {name: 'FAKE PLACE'},
    {
      type: 'GAME_LOST'
    }
  )

  expect(actual).toEqual(town)
  expect(mockSet.mock.calls.length).toBe(mockCalls + 1)
})

test('TRAVEL_TO_TOWN', () => {
  const mockCalls = mockSet.mock.calls.length
  const actual = reducer(
    {name: 'FAKE PLACE'},
    {
      type: 'TRAVEL_TO_TOWN'
    }
  )

  expect(actual).toEqual(town)
  expect(mockSet.mock.calls.length).toBe(mockCalls + 1)
})
