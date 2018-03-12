const createPlayer = ({hp, mana, manaRegen, power, bonusEffect, level}, name) => (
  {
    id: 0,
    name,
    initHp: hp,
    hp,
    initPower: power,
    power,
    maxMana: mana,
    mana,
    manaRegen,
    isCasting: false,
    isAlive: true,
    spells: [],
    bonusEffect,
    level
  }
)


export default function player (state = null, action) {
  let newState = {...state}
  switch (action.type) {
    case 'LOGOUT': return null
    case 'RETURN_TO_MENU':
      newState.hp = newState.initHp
      newState.power = newState.initPower
      newState.spells = []
      newState.isCasting = false,
      newState.mana = newState.maxMana
      return newState
    case 'TRAVEL_TO_TOWN':
      newState.hp = newState.initHp
      newState.power = newState.initPower
      newState.spells = []
      newState.isCasting = false,
      newState.mana = newState.maxMana
      return newState
    case 'LOAD_GAME':
      newState = createPlayer(action.playerWeapon, action.name)
      newState.spells = action.playerSpells.map(spell => ({...spell}))
      return newState
    case 'TICK_ONE_SECOND':
      newState.mana+=newState.manaRegen
      if (newState.mana > newState.maxMana) newState.mana = newState.maxMana
      return newState
    case 'PERCENT_INCREASE_POWER':
      newState.power += newState.power * action.percentage
      return newState
    case 'HEAL_FRIENDLY_TARGET':
      if (!action.target) return newState
      if (action.target.id != newState.id) return state
      newState.hp += action.power
      if (newState.hp > newState.initHp) newState.hp = newState.initHp
      return newState
    case 'HEAL_ALL_FRIENDLY':
      newState.hp+= action.power
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
      newState.hp+= action.power
      if (newState.hp > newState.initHp) newState.hp = newState.initHp
      return newState
    case 'DAMAGE_PLAYER':
      newState.hp-= action.power
      if (newState.hp < 0) newState.hp = 0
      return newState
    case 'DAMAGE_ALL_FRIENDLY':
      newState.hp-= action.power
      if (newState.hp < 0) newState.hp = 0
      return newState
    case 'PERCENT_DAMAGE_PLAYER':
      newState.hp-= (newState.initHp * action.percentage)
      if (newState.hp < 0) newState.hp = 0
      return newState
    case 'PLAYER_GAIN_MANA':
      newState.mana += action.power
      if (newState.mana >= newState.maxMana) newState.mana = newState.maxMana
      return newState
    case 'MAGE_START_BUFF':
      newState.mana += Math.floor(newState.mana * 0.2)
      newState.maxMana += Math.floor(newState.maxMana * 0.2)
      return newState
    case 'SHAMAN_START_BUFF':
      newState.spells = newState.spells.map(spell => {
        spell.cast-= spell.cast * 0.1
        spell.coolDown -= spell.coolDown * 0.1
        return {...spell}
      })
      return newState
    case 'DAMAGE_FRIENDLY_TARGET':
      if (!action.target) return newState
      if (action.target.id == newState.id) newState.hp-=action.power
      return newState
    default: return state
  }
}
