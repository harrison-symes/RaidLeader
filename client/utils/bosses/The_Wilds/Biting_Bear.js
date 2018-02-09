export default {
  name: 'Biting Bear',
  level: 1,
  initHp: 500,
  hp: 500,
  initPower: 30,
  power: 25,
  initArmor: 200,
  armor: 200,
  mana: 25,
  maxMana: 50,
  manaRegen: 1,
  armorRegen: 0,
  isCasting: false,
  bossTarget: null,
  description: "You encounter a starving Bear in The Wilds, and this Bear is very, very hungry...",
  weaponRewards: ['Bear Fangs', 'Bear Heart'],
  goldReward: 200,
  weaponChance: 1,
  progress_required: 1,
  icon: 'ra-pawprint'
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
      name: 'Protect',
      cast: 1,
      cost: 5,
      coolDown: 20,
      type: 'armor',
      singleTarget: false,
      powerRatio: 25,
      onCooldown: false,
      description: 'Gain 25 ARMOR',
      icon: 'ra-eye-shield'
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
