export default function (state = 0, action) {
  switch(action.type) {
    case 'RECEIVE_PLAYER_GOLD':
      return action.gold
    case 'EARN_GOLD_REWARD':
    console.log("earn gold", action.gold);
      return state+=action.gold
    default: return state
  }
}
