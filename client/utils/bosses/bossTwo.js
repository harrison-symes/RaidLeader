export default {
  name: 'Test-Turtle',
  initHp: 10,
  hp: 10,
  initPower: 1,
  power: 1,
  initArmor: 20,
  armor: 20,
  mana: 0,
  maxMana: 20,
  manaRegen: 1,
  armorRegen: 0,
  isCasting: false,
  bossTarget: null,
  spells: [
    {
      name: 'Protect',
      cast: 5,
      cost: 10,
      coolDown: 10,
      type: 'armor',
      singleTarget: false,
      powerRatio: 5,
      onCooldown: false
    },
    {
      name: 'Swipe',
      cast: 2,
      cost: 2,
      coolDown: 2,
      type: 'damage',
      singleTarget: false,
      powerRatio: 1,
      onCooldown: false
    }
  ]
}
