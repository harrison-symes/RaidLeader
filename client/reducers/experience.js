import experienceToLevel from '../utils/experienceToLevel'

const initialState = {
  exp: 0,
  level: 1,
  experienceToLevel: experienceToLevel(1)
}

export default function (state = initialState, action) {
  switch(action.type){
    default: return state
  }
}
