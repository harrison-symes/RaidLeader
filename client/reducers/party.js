import createClass from '../utils/createClass'

// const testParty = [
//   createClass('JeffPaladin', 4),
//   createPriest('JeffPriest', 4),
//   createMonk('JeffMonk', 4),
//   createMember('JeffRogue', 'Rogue', 15, 6, 1),
//   createMember('JeffMage', 'Mage', 10, 3, 2)
// ]

const testParty1 = [
  createClass('Paladin 1', 'Paladin', 1),
  createClass('Priest 1', 'Priest', 1),
  createClass('Rogue 1', 'Rogue', 1),
  createClass('Mage 1', 'Mage', 1),
  createClass('Monk 1', 'Monk', 1)
]

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
