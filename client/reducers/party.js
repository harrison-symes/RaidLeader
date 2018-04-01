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
    case 'PERCENT_INCREASE_RECRUIT_POWER':
      return newState.map(recruit => {
        recruit.power += recruit.power * action.percentage
        return recruit
      })
    case 'PERCENT_INCREASE_RECRUIT_SPEED':
      return newState.map(recruit => {
        recruit.speed += recruit.speed * action.percentage
        return recruit
      })
    case 'PERCENT_INCREASE_TARGET_RECRUIT_POWER':
      if (!action.target) return state
      target = newState.find(recruit => recruit.id == action.target.id)
      if (!target) return state
      console.log({target});
      target.power += target.power * action.percentage
      return newState
    case 'PERCENT_INCREASE_TARGET_RECRUIT_SPEED':
      if (!action.target) return state
      target = newState.find(recruit => recruit.id == action.target.id)
      if (!target) return state
      console.log({target});
      target.speed += target.speed * action.percentage
      return newState
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
      console.log("recruit percentage set");
      newState=  newState.map(member => {
        if (member.isAlive) {
          member.hp = Math.ceil(member.initHp * (action.percentage / 100))
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
        if (member.isAlive) member.hp-=Math.ceil(member.initHp * action.percentage)
        return member
      })
    case 'PERCENT_DAMAGE_FRIENDLY_TARGET':
      if (!action.target) return state
      target = newState.find(member => member.id == action.target.id)
      if (!target || !target.isAlive) return state
      target.hp-=Math.ceil(target.initHp * action.percentage)
      return newState
    case 'PERCENT_HEAL_FRIENDLY_TARGET':
      if (!action.target) return state
      target = newState.find(member => member.id == action.target.id)
      if (!target || !target.isAlive) return state
      target.hp+=Math.ceil(target.initHp * action.percentage)
      if (target.hp >= target.initHp) target.hp = target.initHp
      return newState
    case 'PERCENT_HEAL_ALL_FRIENDLY':
      newState = newState.map(member => {
        if (member.isAlive) {
          member.hp+= Math.ceil(member.initHp * action.percentage)
          if (member.hp >= member.initHp) member.hp = member.initHp
        }
        return member
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
      let bonusPower = newState.filter(member => member.id != action.target.id).length * 0.1
      target.initPower += target.initPower * bonusPower
      target.power += target.power * bonusPower
      return newState
    case 'WARRIOR_START_BUFF':
      return newState.map(member => {
        if (member.id != action.target.id) member.power *= 1.1
        return member
      })
    case 'INCREASE_RECRUIT_SPEED':
      if (!action.recruit) return
      target = newState.find(member => member.id == action.target.id)
      if (!target) return newState
      target.speed+=target.speed*action.percentage
      return newState
    case 'MEMBER_DIED':
      if (!action.target) return state
      target = newState.find(member => member.id == action.target.id)
      if (!target) return state
      target.hp = 0
      target.isAlive = false
      target.effects = []
      console.log({newState, action});
      return newState
    default: return state
  }
}
