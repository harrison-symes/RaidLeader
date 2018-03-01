import reducer from '../../../client/reducers/auth'

jest.mock('../../../client/utils/auth', () => ({
  isAuthenticated: () => (true),
  getUserTokenInfo: () => ({
    user_id: 1,
    user_name: 'TEST USER'
  })
}))

const initialState = {
  isFetching: false,
  isAuthenticated: false,
  user: null,
  errorMessage: ''
}

test('Auth initial state (with token)', () => {
  expect(reducer(undefined, {})).toEqual({
    ...initialState,
    user: {
      user_id: 1,
      user_name: 'TEST USER'
    },
    isAuthenticated: true
  })
})
