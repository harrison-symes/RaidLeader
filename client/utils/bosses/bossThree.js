export default {
  name: 'Spitting Spider',
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
  description: "This Spider knows you hate her, but she hates you too, and she spits on you for it.",
  spells: [
    {
      name: 'Feed',
      cast: 5,
      cost: 10,
      coolDown: 10,
      type: 'special',
      singleTarget: false,
      powerRatio: 1,
      onCooldown: false,
      description: "Gain +1 POWER"
    },
    {
      name: 'Swipe',
      cast: 3,
      cost: 0,
      coolDown: 5,
      type: 'damage',
      singleTarget: false,
      powerRatio: 3,
      onCooldown: false,
      description: "Damage ALL enemy characters for 100% BOSS POWER"
    },
    {
      name: 'Spit',
      cast: 2,
      cost: 0,
      coolDown: 0,
      type: 'damage',
      singleTarget: false,
      powerRatio: 1,
      onCooldown: false,
      description: "Damage the PLAYER for 100% BOSS POWER"
    },
  ]
}
