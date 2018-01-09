export default {
  name: 'Test-O-Saurus',
  initHp: 50,
  hp: 50,
  initPower: 5,
  power: 5,
  initArmor: 3,
  armor: 3,
  mana: 5,
  maxMana: 5,
  manaRegen: 5,
  armorRegen: 10,
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
      coolDown: 5,
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
