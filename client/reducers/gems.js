export default function (state = 0, action) {
  switch(action.type) {
    case 'RECEIVE_GEMS':
      return action.gems
    case 'GAIN_GEMS':
      return state + action.gems
    default: return state
  }
}
