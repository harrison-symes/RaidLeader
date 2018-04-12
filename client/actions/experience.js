import request from '../utils/api'

export function gainExperienceAction (experience) {
  return {
    type: 'GAIN_EXPERIENCE',
    experience
  }
}

export function gainExperience (experience) {
  return dispatch => {
    request('put', 'player/experience', {experience})
      .then(() => dispatch(gainExperienceAction(experience)))
      .catch(err => console.log(err))
  }
}


export function receiveExperience (experience) {
  return {
    type: 'RECEIVE_EXPERIENCE',
    experience
  }
}


export function getExperience () {
  return dispatch => {
    request('get', 'player/experience')
      .then(res => dispatch(receiveExperience(res.body)))
  }
}
