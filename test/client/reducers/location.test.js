import reducer from '../../../client/reducers/location'

const town = {
  name: 'Town',
  type: 'Town',
  inGame: false
}

jest.mock('../../../client/utils/localstorage', () => ({
  get: () => (false)
}))

test.only('location Initial State (no save)', () => {
  const actual = reducer(undefined, {})
  expect(actual).toEqual(town)
})



jest.mock('../../../client/utils/localstorage', () => ({
  get: () => JSON.stringify({"name": 'SAVED LOCATION', "inGame": "false"})
}))

test('location Initial State (save)', () => {
  const actual = reducer(undefined, {})
  expect(actual).toEqual({"name": 'SAVED LOCATION', "inGame": "false"})
})



const mockClear = jest.fn()
jest.mock('../../../client/utils/localstorage', () => ({
  get: () => JSON.stringify({"name": 'SAVED LOCATION', "inGame": "false"}),
  clear: () => mockClear()
}))

test('LOGOUT', () => {

  const actual = reducer(
    undefined,
    {type: 'LOGOUT'}
  )
  expect(mockClear.mock.calls.length).toBe(1)
  expect(actual).toEqual(town)
})
