import request from '../utils/api'
// import createClass from '../utils/createClass'

export function receiveDungeonsAction (dungeons) {
  console.log({dungeons});
  return {
    type: "RECEIVE_RECRUITS",
    // dungeons: dungeons.map(recruit => createClass(recruit))
  }
}

export function getDungeons () {
  return dispatch => {
    request('get', 'dungeons')
    .then(res => dispatch(receiveDungeonsAction(res.body)))
    .catch(err => console.log({err}))
  }
}
