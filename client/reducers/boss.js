const testBoss = {
  name: 'Test-O-Saurus',
  initHp: 100,
  hp: 40,
  initPower: 2,
  power: 2,
  initArmor: 15,
  armor: 15,
  maxMana: 10,
  mana: 0,
  manaRegen: 1,
  armorRegen: 3,
}

export default function boss (state = testBoss, action) {
  let newState = {...state}
  switch(action.type) {
    case 'BOSS_GAIN_ARMOR':
      newState.armor+=action.amount
      if (newState.armor >= newState.initArmor) newState.armor = newState.initArmor
      return newState
    case 'BOSS_GAIN_MANA':
      newState.mana+=action.amount
      if (newState.mana >= newState.maxMana) newState.mana = newState.maxMana
      return newState
    case 'PHYSICAL_ATTACK_BOSS':
      let damage = action.power - newState.armor
      if (damage < 1) damage = 0
      newState.hp = newState.hp - damage
      newState.armor-=1
      if (newState.armor < 0) newState.armor = 0
      return newState
    case 'SPECIAL_ATTACK_BOSS':
      damage = action.power
      if (newState.armor == 0) damage*=2
      newState.hp = newState.hp - damage
      return newState
    default: return state
  }
}
