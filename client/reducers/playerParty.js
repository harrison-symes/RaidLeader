export default function (state = [], action) {
  switch(action.type) {
    case 'ADD_RECRUIT_TO_PARTY':
      console.log({action});
      if (state.find(recruit => recruit == action.recruit)) return [...state].filter(recruit => recruit != action.recruit)
      else return [...state, action.recruit]
    default: return state
  }
}
