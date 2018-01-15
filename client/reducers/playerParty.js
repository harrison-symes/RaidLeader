import createClass from '../utils/createClass'

export default function (state = [], action) {
  let newState = [...state]
  switch(action.type) {
    case 'RECRUIT_EQUIP_WEAPON':
      let recruit = newState.find(other => other.id == action.recruit.id)
      if (recruit) recruit.weapon_id = action.weapon_id
      return newState
    case 'RETURN_TO_MENU':
      newState = newState.map((member) => createClass(member))
      console.log({newState});
      return newState
    case 'TRAVEL_TO_TOWN':
      return []
    case 'ADD_RECRUIT_TO_PARTY':
      newState.splice(action.idx, 0, action.recruit)
      return newState
    case 'REMOVE_RECRUIT_FROM_PARTY':
      return newState.filter(recruit => recruit.id != action.recruit.id)
    case 'SHIFT_PARTY_INDEX':
      newState = newState.filter(recruit => recruit.id != action.recruit.id)
      newState.splice(action.idx, 0, action.recruit)
      return newState
    case 'REPLACE_RECRUIT_IN_PARTY':
      newState = newState.filter(recruit => recruit.id != action.recruit.id)
      newState.splice(action.idx, 1, action.recruit)
      return newState
    default: return state
  }
}
