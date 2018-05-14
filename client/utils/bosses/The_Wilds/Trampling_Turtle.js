export default {
  name: 'Trampling Turtle',
  level: 1,
  initHp: 200,
  hp: 200,
  initPower: 15,
  power: 15,
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
  expReward: 350,
  weaponRewards: ['Ancient Pearls', 'Glowing Pearl Talisman', 'Massive Shell', 'Turtle Aspect'],
  weaponChance: 1,
  progress_required: 0,
  icon: 'ra-turtle-shell',
  spells: [
    {
      name: 'Protect',
      cast: 3,
      cost: 5,
      coolDown: 10,
      type: 'armor',
      singleTarget: false,
      powerRatio: 30,
      onCooldown: false,
      description: "Gain 30 ARMOR",
      icon: 'ra-energy-shield'
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
      description: "Damage ALL enemy characters for 100% BOSS POWER",
      icon: 'ra-claw-slashes'
    },
    {
      name: 'Trample',
      cast: 5,
      cost: 5,
      coolDown: 5,
      type: 'damage',
      singleTarget: true,
      powerRatio: 2,
      onCooldown: false,
      description: "Damage the enemy TARGET and the PLAYER for 200% BOSS POWER",
      icon: 'ra-stomp'
    }
  ]
}
