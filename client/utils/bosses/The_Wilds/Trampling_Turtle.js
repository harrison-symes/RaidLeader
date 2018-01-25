export default {
  name: 'Trampling Turtle',
  level: 1,
  initHp: 300,
  hp: 300,
  initPower: 30,
  power: 30,
  initArmor: 300,
  armor: 300,
  mana: 0,
  maxMana: 20,
  manaRegen: 1,
  armorRegen: 0,
  isCasting: false,
  bossTarget: null,
  description: "This Turtle has a strong shell. Really strong. Like, REALLY strong",
  goldReward: 300,
  weaponRewards: ['Ancient Pearls', 'Turtle Shell'],
  weaponChance: 1,
  progress_required: 1,
  spells: [
    {
      name: 'Protect',
      cast: 3,
      cost: 5,
      coolDown: 10,
      type: 'armor',
      singleTarget: false,
      powerRatio: 50,
      onCooldown: false,
      description: "Gain 50 ARMOR"
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
