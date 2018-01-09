export default function (state = [], action) {
  switch(action.type) {
    case 'ADD_RECRUIT_TO_PARTY':
      console.log({action});
      return [...state, action.recruit]
    default: return state
  }
}
