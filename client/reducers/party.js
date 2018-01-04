const testParty = [
  createMember('JeffPaladin', 'Paladin', 10, 3, 3),
  createMember('JeffPriest', 'Priest', 15, 5, 1),
  createMember('JeffMonk', 'Monk', 20, 3, 1),
  createMember('JeffRogue', 'Rogue', 15, 6, 1),
  createMember('JeffMage', 'Mage', 10, 3, 2)
]

const testParty1 = [
  createPaladin('Level 1', 1),
]
console.log(createPaladin('blah', 4));

function createPaladin (name, level) {
  return createMember(name, 'Paladin', 5 + (level * 5), 1 + (level * 2), 3)
}

function createMember (name, heroClass, hp, power, speed) {
  return  {
    name,
    heroClass,
    initHp: hp,
    hp,
    initSpeed: speed,
    speed,
    initPower: power,
    power
  }
}

export default function party (state = testParty1, action) {
  let newState = [...state]
  switch(action.type) {
    case 'HEAL_FRIENDLY_TARGET':
      if (!action.target) return newState
      const target = newState.find(member => member.name == action.target.name)
      if (!target) return newState
      target.hp = target.hp + action.power
      if (target.hp > target.initHp) target.hp = target.initHp
      return newState
    case 'HEAL_ALL_FRIENDLY':
      newState = newState.map(member => {
        member.hp = member.hp + action.power
        if (member.hp > member.initHp) member.hp = member.initHp
        return member
      })
      return newState
    default: return state
  }
}
