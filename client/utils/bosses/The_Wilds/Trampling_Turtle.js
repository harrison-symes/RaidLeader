export default {
  name: 'Trampling Turtle',
  level: 1,
  initHp: 20,
  hp: 20,
  initPower: 2,
  power: 2,
  initArmor: 30,
  armor: 30,
  mana: 0,
  maxMana: 20,
  manaRegen: 1,
  armorRegen: 0,
  isCasting: false,
  bossTarget: null,
  description: "This Turtle has a strong shell. Really strong. Like, REALLY strong",
  goldReward: 100,
  weaponRewards: ['Ancient Pearls', 'Turtle Shell'],
  weaponChance: 0.5,
  progress_required: 1,
  spells: [
    {
      name: 'Protect',
      cast: 5,
      cost: 10,
      coolDown: 0,
      type: 'armor',
      singleTarget: false,
      powerRatio: 10,
      onCooldown: false,
      description: "Gain 10 ARMOR"
    },
    {
      name: 'Swipe',
      cast: 3,
      cost: 0,
      coolDown: 3,
      type: 'damage',
      singleTarget: false,
      powerRatio: 1,
      onCooldown: false,
      description: "Damage ALL enemy characters for 100% BOSS POWER"
    },
    {
      name: 'Trample',
      cast: 5,
      cost: 5,
      coolDown: 5,
      type: 'damage',
      singleTarget: true,
      powerRatio: 3,
      onCooldown: false,
      description: "Damage the enemy TARGET and the PLAYER for 500% BOSS POWER"
    }
  ]
}
