import request from '../utils/api'
import createClass from '../utils/createClass'

export function receiveRecruitsAction (recruits) {
  console.log({recruits});
  return {
    type: "RECEIVE_RECRUITS",
    recruits: recruits.map(recruit => createClass(recruit))
  }
}

export function getRecruits () {
  return dispatch => {
    request('get', 'recruits')
    .then(res => dispatch(receiveRecruitsAction(res.body)))
    .catch(err => console.log({err}))
  }
}
