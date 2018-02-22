export default {
  name: 'Cycling Conveyer',
  level: 3,
  initHp: 3000,
  hp: 3000,
  initPower: 0,
  power: 0,
  initArmor: 2000,
  armor: 2000,
  mana: 0,
  maxMana: 200,
  manaRegen: 0,
  armorRegen: 0,
  isCasting: false,
  bossTarget: null,
  description: "",
  weaponRewards: ['Curved Chassis', 'Afterburn Arrows', 'Cracked Chassis'],
  goldReward: 1500,
  weaponChance: 1,
  progress_required: 0,
  icon: 'ra-lava',
  spells: [
    {
      name: 'Activate',
      cost: 0,
      cast: 5,
      coolDown: 1,
      powerRatio: 0,
      tickPower: 0,
      type: 'damage',
      singleTarget: false,
      isChanneled: true,
      ticks: 5,
      power: 10,
      onCooldown: false,
      description: "Start Stage 1, gain 10 Power 5 times during the cast",
      icon: 'ra-lever'
    }
  ],
  stageOne: {
    description: 'During Stage 1 the Conveyer will gain 1 mana per second and have a new set of spells, these spells are focused on dealing damage to ALL recruits.',
    manaRegen: 1,
    spells: [
      {
        name: 'Recharge',
        cast: 5,
        cost: 0,
        coolDown: 60,
        type: 'damage',
        singleTarget: false,
        powerRatio: 50,
        mana: 10,
        onCooldown: false,
        description: 'Gain 20 Mana',
        icon: 'ra-energise'
      },
      {
        name: 'Short Circuit',
        cast: 5,
        cost: 0,
        coolDown: 60,
        type: 'damage',
        singleTarget: false,
        powerRatio: 1,
        onCooldown: false,
        percentage: 0.3,
        description: 'Set ALL recruits to 30% of their Max Health',
        icon: 'ra-lightning-trio'
      },
      {
        name: 'Discharge',
        cast: 5,
        cost: 10,
        coolDown: 60,
        type: 'damage',
        isChanneled: true,
        singleTarget: false,
        onCooldown: false,
        tickPower: 0.1,
        powerRatio: 1,
        description: 'Damage ALL recruits for 50% of their Max Health over the cast',
        icon: 'ra-defibrilate'
      },
      {
        name: 'Change Gears',
        cast: 5,
        cost: 0,
        coolDown: 60,
        onCooldown: false,
        singleTarget: false,
        powerRatio: 1,
        description: 'Change to Stage 2. If at 200 Mana, change to Stage 3 instead',
        icon: 'ra-gears'
      }
    ]
  },
  stageTwo: {
    description: 'During Stage 2 the Conveyer will cast focused on dealing direct damage',
    manaRegen: 1,
    spells: [
      {
        name: 'Power Up',
        cast: 5,
        cost: 0,
        coolDown: 60,
        type: 'damage',
        singleTarget: false,
        powerRatio: 50,
        power: 10,
        onCooldown: false,
        description: 'Gain 20 Power',
        icon: 'ra-heartburn'
      },
      {
        name: 'Payload',
        cast: 5,
        cost: 0,
        coolDown: 60,
        type: 'damage',
        powerRatio: 1,
        onCooldown: false,
        singleTarget: true,
        description: "Damage the Boss' Target for (100%) Boss Power",
        icon: 'ra-robot-arm'
      },
      {
        name: 'Power Drill',
        cast: 5,
        cost: 0,
        coolDown: 60,
        type: 'damage',
        powerRatio: 1,
        tickPower: 0.2,
        ticks: 5,
        onCooldown: false,
        singleTarget: true,
        description: "Damage the Boss' Target for (100%) Power over the cast",
        icon: 'ra-drill'
      },
      {
        name: 'Change Gears',
        cast: 5,
        cost: 0,
        coolDown: 60,
        onCooldown: false,
        singleTarget: false,
        powerRatio: 1,
        description: 'Change to Stage 1. If at 200 Mana, change to Stage 3 Instead',
        icon: 'ra-gears'
      },
    ]
  },
  stageThree: {
    description: 'During Stage 3 the Conveyer will stop gaining mana every second uses a mix of spells from the previous stages.',
    manaRegen: 1,
    spells: [
      {
        name: 'Repair',
        cast: 10,
        cost: 0,
        coolDown: 30,
        type: 'support',
        powerRatio: 1,
        power: 10,
        mana: 10,
        health: 500,
        onCooldown: false,
        singleTarget: false,
        description: "The Boss gains 10 Power, 10 Mana and restores 500 Health",
        icon: 'ra-repair'
      },
      {
        name: 'Discharge',
        cast: 10,
        cost: 10,
        coolDown: 25,
        type: 'damage',
        isChanneled: true,
        singleTarget: false,
        onCooldown: false,
        tickPower: 0.1,
        powerRatio: 1,
        description: 'Damage ALL recruits for 50% of their Max Health over the cast',
        icon: 'ra-defibrilate'
      },
      {
        name: 'Power Drill',
        cast: 10,
        cost: 10,
        coolDown: 25,
        type: 'damage',
        powerRatio: 1,
        tickPower: 0.2,
        ticks: 5,
        onCooldown: false,
        singleTarget: true,
        description: "Damage the Boss' Target for (100%) Power over the cast",
        icon: 'ra-drill'
      },
      {
        name: 'Speed Up',
        cast: 5,
        cost: 0,
        coolDown: 10,
        powerRatio: 1,
        onCooldown: false,
        singleTarget: false,
        description: 'Reduce the Cast Time and Cooldown of ALL Boss Spells by 10%',
        icon: 'ra-recycle'
      }
    ]
  }
}
