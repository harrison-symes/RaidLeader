export default function (state = [], action) {
  let newState = [...state]
  switch(action.type) {
    case 'RECEIVE_RECRUITS':
      return action.recruits
    case 'RECRUIT_EQUIP_WEAPON':
      let recruit = newState.find(other => other.id == action.recruit.id)
      if (recruit) recruit.weapon_id = action.weapon_id
      return newState
    default: return state
  }
}
