export default function (state = null, action) {
  switch(action.type) {
    case 'LOGOUT': return null
    case 'EQUIP_PLAYER_WEAPON': return action.weapon
    default: return state
  }
}
