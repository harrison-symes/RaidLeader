export default {
  name: 'Test-Turantula',
  initHp: 50,
  hp: 50,
  initPower: 1,
  power: 1,
  initArmor: 5,
  armor: 5,
  mana: 0,
  maxMana: 10,
  manaRegen: 1,
  armorRegen: 0,
  isCasting: false,
  bossTarget: null,
  spells: [
    {
      name: 'Swipe',
      cast: 2,
      cost: 10,
      coolDown: 0,
      type: 'damage',
      singleTarget: false,
      powerRatio: 3,
      onCooldown: false
    },
    {
      name: 'Spit',
      cast: 1,
      cost: 0,
      coolDown: 0,
      type: 'damage',
      singleTarget: false,
      powerRatio: 1,
      onCooldown: false
    },
  ]
}
