import request from '../utils/api'

export function addRecruitAction (recruit) {
  return {
    type: 'ADD_RECRUIT',
    recruit
  }
}
export function addSpellAction (spell) {
  return {
    type: 'ADD_SPELL',
    spell
  }
}

export function getStarted (paladinName) {
  return dispatch => {
    request('post', 'player/getstarted', {paladinName})
      .then(res => {
        console.log({res});
        dispatch(addRecruitAction(res.recruit))
        dispatch(addSpellAction(res.spell))
      })
  }
}
