
export default function started (state = false, action) {
  switch(action.type) {
    case 'START': return true
    case 'STOP': return false
    default: return state
  }
}
