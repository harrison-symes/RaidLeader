export default {
  name: 'Lunging Locusts',
  level: 1,
  initHp: 40,
  hp: 40,
  initPower: 3,
  power: 3,
  initArmor: 15,
  armor: 20,
  mana: 5,
  maxMana: 5,
  manaRegen: 5,
  armorRegen: 0,
  isCasting: false,
  bossTarget: null,
  description: "As you explore deeper into the Swamp, you see less life around you, and a soft buzzing sound starts getting louder... and louder...",
  weaponRewards: [],
  goldReward: 100,
  weaponChance: 0.5,
  progress_required: 1,
  spells: [
    {
      name: 'Swipe',
      cast: 5,
      cost: 2,
      coolDown: 10,
      type: 'damage',
      singleTarget: false,
      powerRatio: 1,
      onCooldown: false,
      description: 'Damage ALL enemy characters for 100% BOSS POWER',
    },
    {
      name: 'Protect',
      cast: 0.5,
      cost: 1,
      coolDown: 1,
      type: 'armor',
      singleTarget: false,
      powerRatio: 1,
      onCooldown: false,
      description: 'Gain 1 ARMOR'
    },
    {
      name: 'Bite',
      cost: 0,
      cast: 5,
      coolDown: 1,
      powerRatio: 2,
      type: 'damage',
      singleTarget: true,
      onCooldown: false,
      description: "Damage the Boss' TARGET for 200% of BOSS POWER"
    }
  ]
}