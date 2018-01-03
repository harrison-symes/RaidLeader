const testPlayer = {
  initHp: 100,
  hp: 100,
  initPower: 2,
  power: 2,
  initArmor: 1,
  armor: 1,
  maxMana: 100,
  mana: 20,
  manaRegen: 1,
  spells: [
    {
      spell: 'heal',
      cast: 2,
      cost: 10,
    }
  ]
}

export default function player (state = testPlayer, action) {
  switch (action.type) {

    default: return state
  }
}
