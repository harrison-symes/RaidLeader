import request from 'superagent'
import {saveUserToken} from '../utils/auth'
import {receiveLogin} from './login'

export function registerUserRequest ({user_name, password}) {
  return (dispatch) => {
    request
      .post('/api/auth/register')
      .send({
        user_name, password
      })
      .end((err, res) => {
        if (err) {
          alert("didn't work")
        }
        else {
          const userInfo = saveUserToken(res.body.token)
          dispatch(receiveLogin(userInfo))
          document.location = "/#/"
        }
      })
  }
}
