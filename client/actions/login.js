import request from '../utils/api'
import { saveUserToken } from '../utils/auth'

function requestLogin () {
  return {
    type: 'LOGIN_REQUEST',
    isFetching: true,
    isAuthenticated: false
  }
}

export function receiveLogin (user) {
  return {
    type: 'LOGIN_SUCCESS',
    isFetching: false,
    isAuthenticated: true,
    user
  }
}

function loginError (message) {
  return {
    type: 'LOGIN_FAILURE',
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

export function loginUser (creds, cb) {
  return dispatch => {
    dispatch(requestLogin(creds))
    return request('post', 'auth/login', creds)
      .then((response) => {
        console.log({response})
        if (response.status === 403) {
          dispatch(loginError(response.body.message))
          console.log({response});
          cb(response.body.message)
        } else {
          const userInfo = saveUserToken(response.body.token)
          cb(null)
          dispatch(receiveLogin(userInfo))
        }
      }).catch(err => {
        console.log({err})
        cb(err.response.body.message)
      })
  }
}
