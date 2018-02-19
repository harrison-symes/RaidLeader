
export default function (state = null, action) {
  const newState = {...state}
  switch(action.type) {
    case 'LOGOUT': return null
    case 'RETURN_TO_MENU':
      return null
    case 'TRAVEL_TO_TOWN':
      return null
    case 'SELECT_FRIENDLY_TARGET':
      if (action.target.isAlive) return action.target
      else return state
    case 'PALADIN_START_BUFF':
      return action.target
    case 'MEMBER_DIED':
      return null
    default:
      return state
  }
}
