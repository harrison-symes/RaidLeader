export default function (state = null, action) {
  switch(action.type) {
    case 'LOGOUT': return null
    case 'EQUIP_PLAYER_WEAPON': return action.weapon
    case 'TRAVEL_TO_TOWN': return null
    default: return state
  }
}
