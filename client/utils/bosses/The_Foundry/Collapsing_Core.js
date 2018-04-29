export default {
  name: 'Collapsing Core',
  level: 3,
  initHp: 5000,
  hp: 5000,
  initPower: 30,
  power: 30,
  initArmor: 1000,
  armor: 1000,
  mana: 0,
  maxMana: 100,
  manaRegen: 0,
  armorRegen: 0,
  isCasting: false,
  bossTarget: null,
  description: `At the heart of the Volcano lives a Molten, Magnetic Core. The Core's Power was being funnelled out to the Conveyer and the Furnace, and it looks like the energy is being used for further devious means.`,
  weaponRewards: ['Decaying Blade', 'Decayed Core', 'Sheet Music'],
  goldReward: 700,
  weaponChance: 1,
  progress_required: 0,
  icon: 'ra-alien-fire',
  stage: 'stageOne',
  spells: [
    {
      name: 'Charge',
      cost: 0,
      cast: 10,
      coolDown: 0,
      powerRatio: 1,
      healthMax: 0.9,
      type: 'damage',
      singleTarget: false,
      onCooldown: false,
      stage: 'stageTwo',
      description: "(Only used when at 0 Armor) Change to Stage 2, gaining 25 Power",
      icon: 'ra-energise'
    },
    {
      name: 'Magnetic Pulse',
      cost: 0,
      cast: 5,
      coolDown: 15,
      powerRatio: 1,
      percentage: 0.5,
      tickPower: 0,
      percentage: 0.5,
      type: 'damage',
      singleTarget: false,
      isChanneled: true,
      ticks: 3,
      tickPower: 1,
      tickArmor: 50,
      onCooldown: false,
      description: "Gain 150 Armor during the cast, then damage the target for (50%) of Target's Max Health",
      icon: 'ra-magnet'
    },
    {
      name: 'Magma Surge',
      cost: 0,
      cast: 5,
      coolDown: 0,
      powerRatio: 0.5,
      percentage: 0.5,
      tickPower: 0,
      type: 'damage',
      singleTarget: true,
      isChanneled: true,
      ticks: 10,
      tickPower: 0.05,
      onCooldown: false,
      description: "Damage ALL enemies for (50%) of PlAYER Power during the cast, and then Damage the Target for (50%) Boss Power",
      icon: 'ra-lava'
    }

  ],
  stageTwo: {
    stage: 'stageTwo',
    description: 'During Stage 2 the Core will have 50 Power and gain 1 Mana per Second',
    manaRegen: 1,
    power: 50,
    spells: [
      {
        name: 'Meltdown',
        manaRequired: 50,
        cast: 10,
        cost: 0,
        coolDown: 0,
        onCooldown: false,
        singleTarget: false,
        powerRatio: 1,
        stage: 'stageThree',
        description: '(Only useable at 50 Mana) Change to Stage 3, gaining 50 Power and Poisoning ALL Recruits for (60%) of their Max Health over 15 seconds',
        icon: 'ra-radioactive'
      },
      {
        name: 'Half Life',
        cast: 5,
        cost: 0,
        coolDown: 10,
        type: 'damage',
        powerRatio: 1,
        onCooldown: false,
        singleTarget: false,
        description: "Damage EACH Recruit for (50%) of their CURRENT Health",
        icon: 'ra-reactor'
      },
      {
        name: 'Magma Surge',
        cost: 0,
        cast: 5,
        coolDown: 0,
        powerRatio: 0.5,
        percentage: 0.5,
        tickPower: 0,
        type: 'damage',
        singleTarget: true,
        isChanneled: true,
        ticks: 10,
        tickPower: 0.05,
        onCooldown: false,
        description: "Damage ALL enemies for (50%) of PlAYER Power during the cast, and then Damage the Target for (50%) Boss Power",
        icon: 'ra-lava'
      }
    ]
  },
  stageThree: {
    stage: 'stageThree',
    description: 'During Stage 3 the Core will gain 1 Mana per second, increasing in Damage as the Mana reduces. Once at 100 Mana the Core will explode, killing the Player and their Recruits',
    manaRegen: 1,
    power: 100,
    spells: [
      {
        name: 'Explode',
        cast: 10,
        cost: 0,
        coolDown: 0,
        type: 'support',
        manaRequired: 100,
        powerRatio: 10000,
        onCooldown: false,
        singleTarget: false,
        description: "(Only Useable at 100 Mana): Damage ALL enemy characters for (1,000,000%) Boss Power",
        icon: 'ra-bomb-explosion'
      },
      {
        name: 'Radiate',
        cast: 5,
        cost: 0,
        coolDown: 10,
        type: 'damage',
        powerRatio: 1,
        isChanneled: true,
        ticks: 5,
        tickPercentage: 0.08,
        onCooldown: false,
        singleTarget: true,
        description: "Poison ALL Recruits for (60%) of their Max Health over 15 seconds. The Poison increases in damage by 1% for every 1 Mana the Boss has.",
        icon: 'ra-alien-fire'
      },
      {
        name: 'Half Life',
        cast: 5,
        cost: 0,
        coolDown: 10,
        type: 'damage',
        powerRatio: 1,
        onCooldown: false,
        singleTarget: false,
        description: "Damage EACH Recruit for (50%) of their CURRENT Health",
        icon: 'ra-reactor'
      },
      {
        name: 'Fission',
        cast: 5,
        cost: 0,
        coolDown: 0,
        onCooldown: false,
        singleTarget: true,
        powerRatio: 1,
        power: -10,
        description: 'Damage the Boss Target for (100%) Boss Power, lose 10 Power',
        icon: 'ra-tesla'
      }
    ]
  }
}
