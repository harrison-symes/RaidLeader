import request from '../utils/api'

export function receiveRecruitsAction (recruits) {
  return {
    type: "RECEIVE_RECRUITS",
    recruits
  }
}

export function getRecruits () {
  return dispatch => {
    request('get', 'recruits')
    .then(res => dispatch(receiveRecruitsAction(res.body)))
    .catch(err => console.log({err}))
  }
}
