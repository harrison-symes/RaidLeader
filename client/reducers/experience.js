import {levelExperienceRequired, solveLevelByExperience, solveExperienceNeeded} from '../utils/experienceRequired'

const initialState = {
  exp: 0,
  level: 1,
  expNeeded: levelExperienceRequired(1)
}

const createState = exp => ({
  exp,
  level: solveLevelByExperience(exp),
  expNeeded: solveExperienceNeeded(exp),
  totalToLevel: levelExperienceRequired(solveLevelByExperience(exp))
})

export default function (state = initialState, action) {
  switch(action.type){
    case 'RECEIVE_EXPERIENCE':
      return createState(action.experience)
    case 'GAIN_EXPERIENCE':
      return createState(action.experience + state.exp)
    default: return state
  }
}
