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
    armorRegen,
    isCasting: false,
    bossTarget: null,
    spells: [
      {
        name: 'Swipe',
        cast: 3,
        cost: 3,
        coolDown: 10,
        type: 'damage',
        singleTarget: false,
        powerRatio: 0.5,
        onCooldown: false
      },
      {
        name: 'Protect',
        cast: 0.5,
        cost: 1,
        coolDown: 1,
        type: 'armor',
        singleTarget: false,
        powerRatio: 1,
        onCooldown: false
      },
      {
        name: 'Bite',
        cost: 0,
        cast: 5,
        coolDown: 1,
        powerRatio: 1,
        type: 'damage',
        singleTarget: true,
        onCooldown: false
      }
    ]
  }
}

const testBoss = createBoss('Test-O-Saurus', 50, 3, 3, 5, 5, 5, 5)

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
      damage = Math.round(damage)
      newState.hp = newState.hp - damage
      newState.armor-=1
      if (newState.armor < 0) newState.armor = 0
      return newState
    case 'SPECIAL_ATTACK_BOSS':
      damage = action.power
      if (newState.armor == 0) damage*=2
      else damage*=0.5
      damage = Math.round(damage)
      console.log({damage, power: action.power});
      newState.hp = newState.hp - damage
      return newState
    case 'BOSS_WANTS_TO_CAST':
      newState.wantsToCast = action.spell.name
      return newState
    case 'BOSS_START_CASTING':
      if (!action.spell) return newState
      let spell = newState.spells.find(bossSpell => bossSpell == action.spell)
      if (!spell) return newState
      newState.isCasting = true
      return newState
    case 'BOSS_FINISH_CASTING':
      if (!action.spell) return newState
      spell = newState.spells.find(bossSpell => bossSpell == action.spell)
      if (!spell) return newState
      newState.isCasting = false
      newState.wantsToCast = null
      newState.mana-=action.spell.cost
      spell.onCooldown = true
      return newState
    case 'BOSS_SPELL_FINISH_COOLDOWN':
      if (!action.spell) return newState
      spell = newState.spells.find(bossSpell => bossSpell == action.spell)
      if (!spell) return newState
      spell.onCooldown = false
      return newState
    case 'BOSS_CHANGE_TARGET':
      newState.bossTarget = action.target
      return newState
    case 'ROGUE_START_BUFF':
      newState.hp = Math.round(newState.hp * 0.9)
      return newState
    default: return state
  }
}
