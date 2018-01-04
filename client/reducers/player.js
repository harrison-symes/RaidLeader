import spells from '../utils/spells'

const testSpellSet1 = [
  spells.Heal
]

const testSpellSet2 = [
  spells.Heal,
  spells['Healing Ring'],
  spells.Fireball,
  spells.Bind,
  spells['Life Tap']
]

const testPlayer = {
  initHp: 100,
  hp: 60,
  initPower: 2,
  power: 2,
  initArmor: 1,
  armor: 1,
  maxMana: 100,
  mana: 100,
  manaRegen: 1,
  isCasting: false,
  spells: testSpellSet1
}

export default function player (state = testPlayer, action) {
  let newState = {...state}
  switch (action.type) {
    case 'TICK_ONE_SECOND':
      newState.mana+=newState.manaRegen
      if (newState.mana > newState.maxMana) newState.mana = newState.maxMana
      // newState.spells = newState.spells.map(spell => {
      //   spell.currentCD++
      //   if (spell.currentCD >= spell.coolDown) {
      //     spell.currentCD = 0
      //     spell.onCooldown = false
      //   }
      //   return spell
      // })
      return newState
    case 'HEAL_ALL_FRIENDLY':
      newState.hp+= action.power
      if (newState.hp > newState.initHp) newState.hp = newState.initHp
      return newState
    case 'START_CASTING':
      newState.isCasting = true
      return newState
    case 'CAST_SPELL':
      console.log({action}, 'CAST SPELL');
      newState.isCasting = false
      newState.mana-=action.spell.cost
      return newState
    case 'HEAL_PLAYER':
      newState.hp+= action.power
      if (newState.hp > newState.initHp) newState.hp = newState.initHp
      return newState
    case 'DAMAGE_PLAYER':
      newState.hp-= action.power
      return newState
    case 'DAMAGE_ALL_FRIENDLY':
      newState.hp-= action.power
      return newState
    case 'PLAYER_GAIN_MANA':
      newState.mana += action.power
      if (newState.mana >= newState.maxMana) newState.mana = newState.maxMana
      return newState
    default: return state
  }
}
