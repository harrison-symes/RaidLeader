export default function (state = [], action) {
  let newState = [...state]
  switch(action.type) {
    case 'ADD_SPELL_TO_BAR':
      // newState.splice(action.idx, 0, action.recruit)
      return newState
    case 'REMOVE_SPELL_FROM_BAR':
      // return newState.filter(recruit => recruit != action.recruit)
    case 'SHIFT_SPELL_INDEX':
      // newState = newState.filter(recruit => recruit != action.recruit)
      // newState.splice(action.idx, 0, action.recruit)
      // return newState
    default: return state
  }
}
