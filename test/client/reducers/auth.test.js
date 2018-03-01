import reducer from '../../../client/reducers/auth'

jest.mock('../../../client/utils/auth', () => ({
  isAuthenticated: () => (false),
  getUserTokenInfo: () => (null)
}))

const initialState = {
  isFetching: false,
  isAuthenticated: false,
  user: null,
  errorMessage: ''
}

test('Auth initial state (no login)', () => {
  expect(reducer(undefined, {})).toEqual(initialState)
})

test('LOGIN_REQUEST', () => {
  const actual = reducer(initialState, {
    type: 'LOGIN_REQUEST'
  })
  expect(actual).toEqual({
    ...initialState,
    isFetching: true,
    isAuthenticated: false,
    errorMessage: ''
  })
})

test('LOGIN_SUCCESS', () => {
  const actual = reducer(initialState, {
    type: 'LOGIN_SUCCESS',
    user: {
      user_id: 1,
      user_name: 'Test'
    }
  })
  expect(actual).toEqual({
    ...initialState,
    isFetching: false,
    isAuthenticated: true,
    user: {
      user_id: 1,
      user_name: 'Test'
    }
  })
})

test('REGISTER_REQUEST', () => {
  const actual = reducer(initialState, {
    type: 'REGISTER_REQUEST'
  })
  expect(actual).toEqual({
    ...initialState,
    isFetching: true,
    isAuthenticated: false,
    user: null,
  })
})

test('REGISTER_FAILURE', () => {
  const actual = reducer(initialState, {
    type: 'REGISTER_FAILURE',
    message: 'TEST_ERROR'
  })
  expect(actual).toEqual({
    ...initialState,
    isFetching: false,
    isAuthenticated: false,
    user: null,
    errorMessage: 'TEST_ERROR'
  })
})

test('LOGIN_FAILURE', () => {
  const actual = reducer(initialState, {
    type: 'LOGIN_FAILURE',
    message: 'TEST_ERROR'
  })
  expect(actual).toEqual({
    ...initialState,
    isFetching: false,
    isAuthenticated: false,
    user: null,
    errorMessage: 'TEST_ERROR'
  })
})

test('LOGOUT', () => {
  const actual = reducer(initialState, {
    type: 'LOGOUT',
  })
  expect(actual).toEqual(initialState)
})
