const testBoss = {
  initHP: 100,
  hp: 100,
  initPower: 2,
  power: 2,
  initArmor: 1,
  armor: 1,
  maxMana: 10,
  mana: 0,
  manaRegen: 1
}

export default function boss (state = testBoss, action) {
  switch(action.type) {

    default: return state
  }
}
