import request from '../utils/api'

export default function wakeUp () {
  return dispatch => {
    request('get', '/player/wake')
      .then(() => console.log('wake up'))
  }
}
