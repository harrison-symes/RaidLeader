export default {
  name: 'Trampling Turtle',
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
  description: "This Turtle has a strong shell. Really strong. Like, REALLY strong",
  spells: [
    {
      name: 'Protect',
      cast: 1,
      cost: 10,
      coolDown: 0,
      type: 'armor',
      singleTarget: false,
      powerRatio: 5,
      onCooldown: false,
      description: "Gain 5 ARMOR"
    },
    {
      name: 'Swipe',
      cast: 3,
      cost: 0,
      coolDown: 3,
      type: 'damage',
      singleTarget: false,
      powerRatio: 3,
      onCooldown: false,
      description: "Damage ALL enemy characters for 300% BOSS POWER"
    },
    {
      name: 'Spit',
      cast: 1,
      cost: 1,
      coolDown: 0,
      type: 'damage',
      singleTarget: false,
      powerRatio: 1,
      onCooldown: false,
      description: "Damage the PLAYER for 100% BOSS POWER"
    }
  ]
}
