export default {
  name: 'Decaying Deer',
  level: 2,
  initHp: 1000,
  hp: 1000,
  initPower: 50,
  power: 50,
  initArmor: 500,
  armor: 500,
  mana: 2,
  maxMana: 5,
  manaRegen: 1,
  armorRegen: 0,
  isCasting: false,
  bossTarget: null,
  description: "You find the corpse of a deer. So sad... and then it starts moving...",
  weaponRewards: ['Plagued Aegis', 'Plagued Daggers', 'Plagued Wand', 'Plagued Blade', 'Plagued Stave', 'Plagued Scythe', 'Glowing Libram', 'Plagued Staff of the Swamp', 'Plagued Arrows', 'The Antidote'],
  goldReward: 500,
  weaponChance: 1,
  progress_required: 0,
  icon: ' ra-desert-skull',
  spells: [
    {
      name: 'Decay',
      cast: 1,
      cost: 0,
      coolDown: 15,
      singleTarget: false,
      onCooldown: false,
      health: -50,
      powerRatio: 1,
      description: "Poison ALL enemy Recruits for 60% of their Max Health over 15 seconds, lose Health equal to 100% Boss Power",
      icon: 'ra-desert-skull'
    },
    {
      name: 'Regenerate',
      cast: 5,
      cost: 3,
      coolDown: 10,
      type: 'armor',
      singleTarget: false,
      powerRatio: 1,
      armor: 100,
      health: 100,
      onCooldown: false,
      description: 'Gain 100 Armor and 100 Health.',
      icon: 'ra-regeneration'
    },
    {
      name: 'Feed',
      cast: 5,
      cost: 2,
      coolDown: 10,
      type: 'damage',
      singleTarget: false,
      powerRatio: 10,
      onCooldown: false,
      description: 'Gain 10 Power',
      icon: 'ra-knife-fork'
    },
    {
      name: 'Bite',
      cast: 5,
      cost: 2,
      coolDown: 5,
      powerRatio: 1,
      type: 'damage',
      singleTarget: true,
      onCooldown: false,
      description: "Damage the Boss' TARGET for 100% of BOSS POWER",
      icon: 'ra-alligator-clip'
    }
  ]
}
