export default {
  name: 'Decaying Deer',
  level: 1,
  initHp: 100,
  hp: 30,
  initPower: 5,
  power: 5,
  initArmor: 50,
  armor: 20,
  mana: 5,
  maxMana: 5,
  manaRegen: 1,
  armorRegen: 0,
  isCasting: false,
  bossTarget: null,
  description: "You find the corpse of a deer. So sad... and then it starts moving...",
  weaponRewards: [],
  goldReward: 100,
  weaponChance: 0.5,
  progress_required: 0,
  spells: [
    {
      name: 'Regenerate',
      cast: 5,
      cost: 3,
      coolDown: 5,
      type: 'armor',
      singleTarget: false,
      powerRatio: 1,
      armor: 10,
      health: 10,
      onCooldown: false,
      description: 'Gain 10 Armor and 10 Health. (Only used when below 90 Health)'
    },
    {
      name: 'Feed',
      cast: 5,
      cost: 2,
      coolDown: 10,
      type: 'damage',
      singleTarget: false,
      powerRatio: 1,
      onCooldown: false,
      description: 'Gain 1 Power',
    },
    {
      name: 'Plague Bite',
      cast: 5,
      cost: 2,
      coolDown: 5,
      powerRatio: 1,
      type: 'damage',
      singleTarget: true,
      onCooldown: false,
      description: "Damage the Boss' TARGET for 100% of BOSS POWER, Poison the Target for 100% Boss Power as Damage every 5 seconds for 15 seconds"
    }
  ]
}
