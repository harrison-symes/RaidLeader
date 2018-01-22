export default function (state = [], action) {
  let newState = [...state]
  switch(action.type) {
    case 'RECEIVE_RECRUITS':
      return action.recruits
    case 'ADD_RECRUIT':
      return [...newState, action.recruit]
    case 'RECRUIT_EQUIP_WEAPON':
      let recruit = newState.find(other => other.id == action.recruit.id)
      if (recruit) recruit.weapon_id = action.weapon_id
      return newState
    case 'UPDATE_RECRUIT':
      if (!action.recruit) return newState
      let idx = newState.findIndex(recruit => recruit.id == action.recruit.id)
      if (!idx) return newState
      newState[idx] = action.recruit
      return newState
    default: return state
  }
}
