
export default function started (state = false, action) {
  switch(action.type) {
    case 'TRAVEL_TO_TOWN': return false
    case 'START': return true
    case 'STOP': return false
    case 'GAME_WON': return false
    case 'GAME_LOST': return false
    default: return state
  }
}
