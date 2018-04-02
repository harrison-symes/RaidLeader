export default {
  name: 'Biting Bear',
  level: 1,
  initHp: 1,
  hp: 1,
  initPower: 0,
  power: 0,
  initArmor: 0,
  armor: 0,
  mana: 25,
  maxMana: 25,
  manaRegen: 1,
  armorRegen: 0,
  isCasting: false,
  bossTarget: null,
  description: "You encounter a starving Bear in The Wilds, and this Bear is very, very hungry...",
  weaponRewards: ['Bear Fangs', 'Bear Heart', 'Bear Claw Arrows', 'Chew Toy'],
  goldReward: 300,
  weaponChance: 1,
  progress_required: 0,
  icon: 'ra-pawprint',
  spells: [
    {
      name: 'Swipe',
      cast: 3,
      cost: 10,
      coolDown: 10,
      type: 'damage',
      singleTarget: false,
      powerRatio: 1,
      onCooldown: false,
      description: 'Damage ALL enemy characters for 100% BOSS POWER',
      icon: 'ra-bird-claw'
    },
    {
      name: 'Bite',
      cast: 5,
      cost: 0,
      coolDown: 1,
      powerRatio: 2,
      type: 'damage',
      singleTarget: true,
      onCooldown: false,
      description: "Damage the Boss' TARGET for 200% of BOSS POWER",
      icon: 'ra-alligator-clip'
    }
  ]
}
