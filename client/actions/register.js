import request from 'superagent'
import {saveUserToken} from '../utils/auth'
import {receiveLogin} from './login'

export function registerUserRequest ({user_name, password}, cb) {
  return (dispatch) => {
    request
      .post('/api/v1/auth/register')
      .send({
        user_name, password
      })
      .then(response => {
        const userInfo = saveUserToken(res.body.token)
        dispatch(receiveLogin(userInfo))
        cb(null)
      })
      .catch(err => {
        cb(err.response.body.message)
      })
  }
}
