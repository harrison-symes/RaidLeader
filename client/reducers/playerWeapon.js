export default function (state = null, action) {
  switch(action.type) {
    case 'EQUIP_PLAYER_WEAPON': return action.weapon
    default: return state
  }
}
