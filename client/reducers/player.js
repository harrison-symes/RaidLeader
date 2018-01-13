const testPlayer = {
  name: 'Harrison',
  initHp: 100,
  hp: 10,
  initPower: 2,
  power: 2,
  initArmor: 1,
  armor: 1,
  maxMana: 100,
  mana: 100,
  manaRegen: 1,
  isCasting: false,
  isAlive: true,
  spells: []
}

export default function player (state = testPlayer, action) {
  let newState = {...state}
  switch (action.type) {
    case 'TRAVEL_TO_TOWN':
      newState.hp = newState.initHp
      newState.power = newState.initPower
      newState.spells = []
      newState.isCasting = false,
      newState.mana = newState.maxMana
      return newState
    case 'LOAD_GAME':
      newState.spells = action.playerSpells
      return newState
    case 'TICK_ONE_SECOND':
      newState.mana+=newState.manaRegen
      if (newState.mana > newState.maxMana) newState.mana = newState.maxMana
      return newState
    case 'HEAL_ALL_FRIENDLY':
      newState.hp+= Math.round(action.power)
      if (newState.hp > newState.initHp) newState.hp = newState.initHp
      return newState
    case 'START_CASTING':
      newState.isCasting = true
      return newState
    case 'CAST_SPELL':
      newState.isCasting = false
      newState.mana-=action.spell.cost
      return newState
    case 'HEAL_PLAYER':
      newState.hp+= Math.round(action.power)
      if (newState.hp > newState.initHp) newState.hp = newState.initHp
      return newState
    case 'DAMAGE_PLAYER':
      newState.hp-= Math.round(action.power)
      return newState
    case 'DAMAGE_ALL_FRIENDLY':
      newState.hp-= Math.round(action.power)
      return newState
    case 'PLAYER_GAIN_MANA':
      newState.mana += action.power
      if (newState.mana >= newState.maxMana) newState.mana = newState.maxMana
      return newState
    case 'MAGE_START_BUFF':
      newState.mana = Math.round(newState.mana * 1.2)
      newState.maxMana = Math.round(newState.maxMana * 1.2)
      return newState
    case 'DAMAGE_FRIENDLY_TARGET':
      if (!action.target) return newState
      if (action.target.name == newState.name) newState.hp-=Math.round(action.power * 2)
      return newState
    default: return state
  }
}
