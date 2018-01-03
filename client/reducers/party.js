const testParty = [
  createMember('JeffTank', 'Paladin', 20, 2, 2, 2),
  createMember('JeffHeal', 'Priest', 15, 0, 5, 1)
]

function createMember (name, heroClass, hp, armor, speed, power) {
  return  {
      name,
      heroClass,
      initHp: hp,
      hp: hp -10,
      initArmor: armor,
      armor,
      initSpeed: speed,
      speed,
      initPower: power,
      power
    }
}

export default function party (state = testParty, action) {
  let newState = [...state]
  switch(action.type) {
    case 'HEAL_FRIENDLY_TARGET':
      const target = newState.find(member => member == action.target)
      target.hp = target.hp + action.power
      if (target.hp > target.initHp) target.hp = target.initHp
      return newState
    default: return state
  }
}
