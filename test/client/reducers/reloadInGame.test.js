import reducer from '../../../client/reducers/location'

const town = {
  name: 'Town',
  type: 'Town',
  inGame: false
}

const mockClear = jest.fn()
const mockSet = jest.fn()

jest.mock('../../../client/utils/localstorage', () => ({
  get: () => (JSON.stringify({name: 'FAKE PLACE', inGame: true})),
  clear: () => mockClear(),
  set: () => mockSet()
}))

test('location Initial State (no save)', () => {
  const actual = reducer(undefined, {})
  expect(actual).toEqual(town)
})
