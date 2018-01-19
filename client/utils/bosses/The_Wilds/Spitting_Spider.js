
export default {
  name: 'Spitting Spider',
  level: 1,
  initHp: 50,
  hp: 50,
  initPower: 1,
  power: 1,
  initArmor: 50,
  armor: 50,
  mana: 0,
  maxMana: 10,
  manaRegen: 1,
  armorRegen: 0,
  isCasting: false,
  bossTarget: null,
  description: "This Spider knows you hate her, but she hates you too, and she spits on you for it.",
  goldReward: 150,
  weaponRewards: ['Fine Silk', 'Spider Eye Wand'],
  weaponChance: 0.5,
  progress_required: 2,
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
      coolDown: 3,
      type: 'damage',
      singleTarget: false,
      powerRatio: 1,
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
      powerRatio: 3,
      onCooldown: false,
      description: "Damage the PLAYER for 300% BOSS POWER"
    },
  ]
}
