export default function (state = [], action) {
  switch(action.type) {
    case 'RECEIVE_RECRUITS':
      return action.recruits
    default: return state
  }
}
