function createBoss (name, hp, power, armor, mana, maxMana, manaRegen, armorRegen) {
  return {
    name,
    initHp: hp,
    hp,
    initPower: power,
    power,
    initArmor: armor,
    armor,
    mana,
    maxMana,
    manaRegen,
    armorRegen
  }
}

const testBoss = createBoss('Test-O-Saurus', 5, 5, 5, 5, 5, 5, 5)

export default function boss (state = testBoss, action) {
  let newState = {...state}
  switch(action.type) {
    case 'BOSS_GAIN_ARMOR':
    console.log("gain armor");
      newState.armor+=action.amount
      if (newState.armor >= newState.initArmor) newState.armor = newState.initArmor
      return newState
    case 'BOSS_GAIN_MANA':
    console.log("gain mana");
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
      else damage*=0.5
      newState.hp = newState.hp - damage
      return newState
    default: return state
  }
}
