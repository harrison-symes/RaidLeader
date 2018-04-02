const levelExperienceRequired = level => {
  const baseExp = 500
  const scaleAmount = 1.1
  let experienceToLevel = baseExp
  for (var i = 1; i < level; i++) {
    experienceToLevel*=scaleAmount
  }
  return Math.floor(experienceToLevel)
}

module.exports = levelExperienceRequired
