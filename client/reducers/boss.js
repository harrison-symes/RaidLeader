export default function boss (state = null, action) {
  let newState = {...state}
  switch(action.type) {
    case 'RETURN_TO_MENU':
      return null
    case 'TRAVEL_TO_TOWN':
      return null
    case 'TARGET_BOSS':
      action.boss.spells.map(spell => {
        spell.onCooldown = false
        return spell
      })
      return {...action.boss}
    case 'BOSS_GAIN_ARMOR':
      newState.armor+=action.amount
      if (newState.armor >= newState.initArmor) newState.armor = newState.initArmor
      return newState
    case 'BOSS_GAIN_MANA':
      newState.mana+=action.amount
      if (newState.mana >= newState.maxMana) newState.mana = newState.maxMana
      return newState
    case 'BOSS_GAIN_POWER':
      newState.power+=action.amount
      if (newState.power < 0) newState.power = 0
      return newState
    case 'HEAL_BOSS':
      newState.hp += action.power
      if (newState.hp > newState.initHp) newState.hp = newState.initHp
      return newState
    case 'PHYSICAL_ATTACK_BOSS':
      let damage = Math.round(action.power)
      if (newState.armor >= damage) {
        newState.armor-=damage
        damage = 0
      } else {
        damage-=newState.armor
        newState.armor = 0
      }
      newState.hp-= damage
      return newState
    case 'SPECIAL_ATTACK_BOSS':
      damage = Math.round(action.power)
      if (newState.armor == 0) {
        damage*=1.5
      } else if (newState.armor >= damage) {
        newState.armor-=damage
        damage = 0
      } else {
        damage-=newState.armor
        newState.armor = 0
      }
      newState.hp-= damage
      return newState
    case 'PLAYER_ATTACK_BOSS':
      damage = Math.round(action.power)
      if (newState.armor >= damage) {
        newState.armor-=damage
        damage = 0
      } else {
        damage-=newState.armor
        newState.armor = 0
      }
      newState.hp-= damage
      return newState
    case 'CRITICAL_ATTACK_BOSS':
      damage = action.power * 2
      damage = Math.round(damage)
      if (newState.armor < 0) newState.armor = 0
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
    case 'WARLOCK_START_BUFF':
      newState.armor-=action.power
      if (newState.armor < 0) newState.armor = 0
      return newState
    case 'PALADIN_START_BUFF':
      newState.bossTarget = action.target
      return newState
    case 'MEMBER_DIED':
      if (action.target == newState.bossTarget) newState.bossTarget.isAlive = false
      return newState
    default: return state
  }
}
