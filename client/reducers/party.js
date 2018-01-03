const testParty = [
  createMember('JeffPaladin', 'Paladin', 20, 2, 2, 2),
  createMember('JeffPriest', 'Priest', 15, 0, 5, 1),
  createMember('JeffMonk', 'Monk', 20, 0, 3, 1),
  createMember('JeffRogue', 'Rogue', 15, 0, 6, 1),
  createMember('JeffMage', 'Mage', 10, 0, 3, 2)
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
      const target = newState.find(member => member.name == action.target.name)
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
