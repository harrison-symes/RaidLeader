export default function party (state = [], action) {
  let newState = [...state]
  switch(action.type) {
    case 'LOGOUT': return []
    case 'RETURN_TO_MENU':
      return []
    case 'TRAVEL_TO_TOWN':
      return []
    case 'LOAD_GAME':
      return action.playerParty.map(recruit => ({...recruit}))
    case 'HEAL_FRIENDLY_TARGET':
      if (!action.target) return newState
      let target = newState.find(member => member.id == action.target.id)
      if (!target || !target.isAlive) return newState
      target.hp = target.hp + action.power
      if (target.hp > target.initHp) target.hp = target.initHp
      return newState
    case 'HEAL_ALL_FRIENDLY':
      newState = newState.map(member => {
        if (!member.isAlive) return member
        member.hp+= action.power
        if (member.hp > member.initHp) member.hp = member.initHp
        return member
      })
      return newState
    case 'ADD_EFFECT_TO_TARGET':
      if (!action.target) return newState
      target = newState.find(member => member.id == action.target.id)
      if (!target || !target.isAlive) return newState
      target.effects = target.effects.filter(effect => effect.name != action.effect.name)
      target.effects.push({...action.effect})
      return newState
    case 'ADD_EFFECT_TO_ALL_FRIENDLY':
      newState = newState.map(target => {
        if (target.isAlive) {
          target.effects = target.effects.filter(effect => effect.name != action.effect.name)
          target.effects.push({...action.effect})
        }
        return target
      })
      return newState
    case 'REMOVE_EFFECT_FROM_TARGET':
      if (!action.target) return state
      target = newState.find(member => member == action.target)
      if (!target) return state
      target.effects = target.effects.filter(effect => effect.name != action.effect.name)
      return newState
    case 'REMOVE_EFFECTS_FROM_ALL':
      newState.forEach(member => {
        member.effects = []
      })
    case 'REMOVE_EFFECTS_FROM_TARGET':
      if (!action.target) return newState
      target = newState.find(member => member.id == action.target.id)
      if (!target) return newState
      target.effects = []
      return newState
    case 'SET_RECRUIT_PERCENTAGE':
      newState=  newState.map(member => {
        if (member.isAlive) {
          member.hp = (member.initHp * (action.percentage / 100))
        }
        return member
      })
      return newState
    case 'DAMAGE_ALL_FRIENDLY':
      newState = newState.map(member => {
        if (member.isAlive) member.hp-=action.power
        return member
      })
      return newState
    case 'DAMAGE_FRIENDLY_TARGET':
      if (!action.target) return newState
      target = newState.find(member => member.id == action.target.id)
      if (!target || !target.isAlive) return newState
      target.hp-=action.power
      return newState
    case 'PERCENT_DAMAGE_DAMAGE_ALL_FRIENDLY':
      newState = newState.map(member => {
        if (member.isAlive) member.hp-=member.initHp * action.percentage
        return member
      })
    case 'PERCENT_DAMAGE_FRIENDLY_TARGET':
      if (!action.target) return newState
      target = newState.find(member => member.id == action.target.id)
      if (!target || !target.isAlive) return newState
      target.hp-=target.initHp * action.percentage
      return newState
    case 'PERCENT_HEAL_FRIENDLY_TARGET':
      if (!action.target) return newState
      target = newState.find(member => member.id == action.target.id)
      if (!target || !target.isAlive) return newState
      target.hp+=target.initHp * action.percentage
      if (target.hp >= target.initHp) target.hp = target.initHp
      return newState
    case 'PERCENT_HEAL_ALL_FRIENDLY':
      newState = newState.map(member => {
        if (member.isAlive) {
          member.hp+=member.initHp * action.percentage
          if (member.hp >= member.initHp) member.hp = member.initHp
          return member
        }
      })
      return newState
    case 'PRIEST_START_BUFF':
      newState = newState.map(member => {
        if (member.id  != action.target.id) member.initHp+= member.initHp * 0.1
        return member
      })
      return newState
    case 'HUNTER_START_BUFF':
      newState = newState.map(member => {
        if (member.id != action.target  .id) member.speed+= (member.speed * 0.1)
        return member
      })
      return newState
    case 'PALADIN_START_BUFF':
      if (!action.target) return state
      target = newState.find(member => member.id == action.target.id)
      if (!target) return newState
      let bonusHp = newState.filter(member => member.id != action.target.id).length * (target.initHp * 0.03)
      target.initHp += bonusHp
      target.hp += bonusHp
      return newState
    case 'MONK_START_BUFF':
      if (!action.target) return newState
      target = newState.find(member => member.id == action.target.id)
      if (!target) return newState
      let bonusSpeed = newState.filter(member => member.id != action.target.id).length * 0.5
      target.initSpeed += bonusSpeed
      target.speed += bonusSpeed
      return newState
    case 'WARRIOR_START_BUFF':
      return newState.map(member => {
        if (member.id != action.target.id) member.power *= 1.1
        return member
      })
    case 'MEMBER_DIED':
      if (!action.target) return state
      target = newState.find(member => member.id == action.target.id)
      if (!target) return state
      target.hp = 0
      target.isAlive = false
      target.effects = []
      return newState
    default: return state
  }
}
