export default function (state = 0, action) {
  switch(action.type) {
    case 'LOGOUT': return 0
    case 'RECEIVE_PLAYER_GOLD':
      return action.gold
    case 'EARN_GOLD_REWARD':
      return state+=action.gold
    default: return state
  }
}
