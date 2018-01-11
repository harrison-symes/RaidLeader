export default function (state = [], action) {
  let newState = [...state]
  switch(action.type) {
    case 'ADD_RECRUIT_TO_PARTY':
      newState.splice(action.idx, 0, action.recruit)
      return newState
    case 'REMOVE_RECRUIT_FROM_PARTY':
      return newState.filter(recruit => recruit != action.recruit)
    case 'SHIFT_PARTY_INDEX':
      newState = newState.filter(recruit => recruit != action.recruit)
      newState.splice(action.idx, 0, action.recruit)
      return newState
    case 'REPLACE_SPELL_IN_BAR':
      newState = newState.filter(recruit => recruit != action.recruit)
      newState.splice(action.idx, 1, action.recruit)
      return newState
    default: return state
  }
}
