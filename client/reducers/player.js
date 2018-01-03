const testPlayer = {
  initHp: 100,
  hp: 60,
  initPower: 5,
  power: 5,
  initArmor: 1,
  armor: 1,
  maxMana: 100,
  mana: 100,
  manaRegen: 1,
  isCasting: false,
  spells: [
    {
      name: 'heal',
      cast: 2,
      cost: 10,
      coolDown: 1,
      type: 'heal',
      singleTarget: true,
      powerRatio: 1
    },
    {
      name: 'circle',
      cast: 3,
      cost: 20,
      coolDown: 5,
      type: 'heal',
      singleTarget: false,
      powerRatio: 1
    }
  ]
}

export default function player (state = testPlayer, action) {
  let newState = {...state}
  switch (action.type) {
    case 'TICK_ONE_SECOND':
      newState.mana+=newState.manaRegen
      if (newState.mana > newState.maxMana) newState.mana = newState.maxMana
      // newState.spells = newState.spells.map(spell => {
      //   spell.currentCD++
      //   if (spell.currentCD >= spell.coolDown) {
      //     spell.currentCD = 0
      //     spell.onCooldown = false
      //   }
      //   return spell
      // })
      return newState
    case 'HEAL_ALL_FRIENDLY':
      newState.hp+= action.power
      if (newState.hp > newState.initHp) newState.hp = newState.initHp
      return newState
    case 'START_CASTING':
      newState.isCasting = true
      return newState
    case 'CAST_SPELL':
      console.log({action}, 'CAST SPELL');
      newState.isCasting = false
      newState.mana-=action.spell.cost
      return newState

    default: return state
  }
}
