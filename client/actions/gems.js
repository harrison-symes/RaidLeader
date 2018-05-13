import request from '../utils/api'

export function gainGemsAction (gems) {
  return {
    type: 'GAIN_GEMS',
    gems
  }
}

export function gainGems (gems, cb) {
  return dispatch => {
    request('put', 'player/gems', {gems})
      .then(() => {
        dispatch(gainGemsAction(gems))
        if (cb) cb(true)
      })
      .catch(err => console.log(err))
  }
}


export function receiveGems (gems) {
  return {
    type: 'RECEIVE_GEMS',
    gems
  }
}


export function getGems () {
  return dispatch => {
    request('get', 'player/gems')
      .then(res => dispatch(receiveGems(res.body)))
  }
}
