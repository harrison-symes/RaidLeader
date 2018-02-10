import request from '../utils/api'
import createClass from '../utils/createClass'

export function receiveRecruitsAction (recruits) {
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

export function addRecruitAction (recruit) {
  console.log("Add Recruit", {recruit, other: createClass(recruit)});
  return {
    type: 'ADD_RECRUIT',
    recruit: createClass(recruit)
  }
}

export function addRecruit (recruit) {
  return dispatch => {
    request('post', 'recruits', recruit)
      .then(res => dispatch(addRecruitAction(res.body)))
  }
}

export function updateRecruitAction (recruit) {
  return {
    type: 'UPDATE_RECRUIT',
    recruit: createClass(recruit)
  }
}

export function levelUpRecruit (level, id) {
  return dispatch => {
    request('put', 'recruits/level', {level, id})
      .then(res => dispatch(updateRecruitAction(res.body)))
  }
}
