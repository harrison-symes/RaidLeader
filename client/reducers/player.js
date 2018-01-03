const testPlayer = {
  initHp: 100,
  hp: 60,
  initPower: 2,
  power: 2,
  initArmor: 1,
  armor: 1,
  maxMana: 100,
  mana: 20,
  manaRegen: 1,
  spells: [
    {
      spell: 'heal',
      cast: 2,
      cost: 10,
    }
  ]
}

export default function player (state = testPlayer, action) {
  let newState = {...state}
  switch (action.type) {
    case 'TICK_ONE_SECOND':
      newState.mana++
      if (newState.mana > newState.maxMana) newState.mana = newState.maxMana
      return newState
    case 'HEAL_ALL_FRIENDLY':
      newState.hp+= action.power
      if (newState.hp > newState.initHp) newState.hp = newState.initHp
      return newState
    default: return state
  }
}
