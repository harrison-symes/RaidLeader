export default function bossCount (state = 0, action) {
  switch(action.type) {
    case 'GAME_WON': return state++
    case 'GAME_LOST': return state++
    case 'LOGOUT': return 0
    default: return state
  }
}
