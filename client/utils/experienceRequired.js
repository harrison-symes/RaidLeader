const levelExperienceRequired = level => {
  const baseExp = 500
  const scaleAmount = 1.1
  let experienceToLevel = baseExp
  for (var i = 1; i < level; i++) {
    experienceToLevel*=scaleAmount
  }
  return Math.floor(experienceToLevel)
}

const solveLevelByExperience = exp => {
  let level = 0
  while (levelExperienceRequired(level) < exp) {
    level++
    exp-=levelExperienceRequired(level)
  }
  return level
}

const experienceForLevel = level => {
  let exp = 0
  for (var i = 1; i <= level; i++) {
    exp+=levelExperienceRequired(i)
  }
  console.log({level, exp});
  return exp
}

const solveExperienceNeeded = exp => {
  let level = solveLevelByExperience(exp)
  let consumedExp = experienceForLevel(level)
  console.log({level, consumedExp});
  return exp - consumedExp
}

module.exports = {
  levelExperienceRequired,
  solveLevelByExperience,
  solveExperienceNeeded,
  experienceForLevel
}

// console.log(solveLevelByExperience(500));
// console.log(solveLevelByExperience(15000));
