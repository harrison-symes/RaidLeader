const testBoss = {
  name: 'Test-O-Saurus',
  initHp: 100,
  hp: 40,
  initPower: 2,
  power: 2,
  initArmor: 1,
  armor: 1,
  maxMana: 10,
  mana: 0,
  manaRegen: 1
}

export default function boss (state = testBoss, action) {
  let newState = {...state}
  switch(action.type) {
    case 'TICK_ONE_SECOND':
      if (state.mana == state.maxMana) state.mana = state.maxMana
      return newState
    case 'PHYSICAL_ATTACK_BOSS':
      console.log({newState, action});
      let damage = action.power - newState.armor
      if (damage < 1) damage = 1
      newState.hp = newState.hp - damage
      console.log({newState});
      return newState
    default: return state
  }
}
