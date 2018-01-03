const testParty = [
  createMember('Jeff', 'Paladin', 20, 2, 2, 2),
  createMember('Jeff2', 'Paladin', 20, 2, 2, 2)
]

function createMember (name, heroClass, hp, armor, speed, power) {
  return  {
      name,
      heroClass,
      initHp: hp,
      hp,
      initArmor: armor,
      armor,
      initSpeed: speed,
      speed,
      initPower: power,
      power
    }
}

export default function party (state = testParty, action) {
  switch(action.type) {
    default: return state
  }
}
