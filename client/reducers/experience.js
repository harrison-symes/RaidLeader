import {levelExperienceRequired, solveLevelByExperience, solveExperienceNeeded} from '../utils/experienceRequired'

const initialState = {
  exp: 0,
  level: 1,
  expNeeded: levelExperienceRequired(1)
}

export default function (state = initialState, action) {
  switch(action.type){
    case 'RECEIVE_EXPERIENCE':
      const exp = action.experience
      const level = solveLevelByExperience(action.experience)
      return {
        exp,
        level,
        expNeeded: solveExperienceNeeded(exp),
        totalToLevel: levelExperienceRequired(level)
      }
    default: return state
  }
}
