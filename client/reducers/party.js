export default function party (state = [], action) {
  let newState = [...state]
  switch(action.type) {
    case 'RETURN_TO_MENU':
      return []
    case 'TRAVEL_TO_TOWN':
      return []
    case 'LOAD_GAME':
      return [...action.playerParty]
    case 'HEAL_FRIENDLY_TARGET':
      if (!action.target) return newState
      let target = newState.find(member => member == action.target)
      if (!target || !target.isAlive) return newState
      target.hp = target.hp + Math.round(action.power)
      if (target.hp > target.initHp) target.hp = target.initHp
      return newState
    case 'HEAL_ALL_FRIENDLY':
      newState = newState.map(member => {
        if (!member.isAlive) return member
        member.hp+= Math.round(action.power)
        if (member.hp > member.initHp) member.hp = member.initHp
        return member
      })
      return newState
    case 'ADD_EFFECT_TO_TARGET':
      if (!action.target) return newState
      target = newState.find(member => member == action.target)
      if (!target || !target.isAlive) return newState
      target.effects = target.effects.filter(effect => effect.name != action.effect.name)
      target.effects.push({...action.effect})
      return newState
    case 'ADD_EFFECT_TO_ALL_FRIENDLY':
      newState = newState.map(target => {
        target.effects = target.effects.filter(effect => effect.name != action.effect.name)
        target.effects.push({...action.effect})
        return target
      })
      return newState
    case 'REMOVE_EFFECT_FROM_TARGET':
      if (!action.target) return newState
      target = newState.find(member => member == action.target)
      if (!target || !target.isAlive) return newState
      target.effects = target.effects.filter(effect => effect.name != action.effect.name)
      return newState
    case 'DAMAGE_ALL_FRIENDLY':
      newState = newState.map(member => {
        if (member.isAlive) member.hp-=Math.round(action.power)
        return member
      })
      return newState
    case 'LEVEL_DAMAGE_ALL_FRIENDLY':
      newState = newState.map(member => {
        if (member.isAlive) member.hp-=member.level
        return member
      })
      return newState
    case 'DAMAGE_FRIENDLY_TARGET':
      if (!action.target) return newState
      target = newState.find(member => member == action.target)
      if (!target || !target.isAlive) return newState
      target.hp-=Math.round(action.power)
      return newState
    case 'PRIEST_START_BUFF':
      newState = newState.map(member => {
        member.initHp+= Math.round(action.hp)
        return member
      })
      return newState
    case 'PALADIN_START_BUFF':
      if (!action.target) return newState
      target = newState.find(member => member == action.target)
      if (!target) return newState
      let bonusHp = newState.filter(member => member != action.target).length * target.level
      target.initHp += bonusHp
      target.hp += bonusHp
      return newState
    case 'MONK_START_BUFF':
      if (!action.target) return newState
      target = newState.find(member => member == action.target)
      if (!target) return newState
      let bonusSpeed = newState.filter(member => member != action.target).length
      target.initSpeed += bonusSpeed
      target.speed += bonusSpeed
      return newState
    case 'WARRIOR_START_BUFF':
      newState = newState.map(member => {
        if (member != action.target) {
          member.initPower += member.level
          member.power += member.level
        }
        return member
      })
      return newState
    case 'MEMBER_DIED':
      if (!action.target) return newState
      target = newState.find(member => member == action.target)
      if (!target) return newState
      target.hp = 0
      target.isAlive = false
      return newState
    default: return state
  }
}
