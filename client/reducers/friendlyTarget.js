
export default function (state = null, action) {
  const newState = {...state}
  switch(action.type) {
    case 'LOGOUT': return null
    case 'RETURN_TO_MENU':
      return null
    case 'TRAVEL_TO_TOWN':
      return null
    case 'SELECT_FRIENDLY_TARGET':
      if (action.target && action.target.isAlive) return action.target
      else return state
    case 'PALADIN_START_BUFF':
      return action.target
    case 'MEMBER_DIED':
    console.log({action});
      if (!action.target) return state
      if (state && action.target.id == state.id) return null
      else return state
    default:
      return state
  }
}
