export default {
  name: 'Trapped Tunnel',
  level: 3,
  initHp: 10000,
  hp: 10000,
  initPower: 30,
  power: 30,
  initArmor: 0,
  armor: 0,
  mana: 0,
  maxMana: 180,
  manaRegen: 0,
  armorRegen: 0,
  isCasting: false,
  bossTarget: null,
  description: `TESTING :) <3`,
  weaponRewards: ['Snake Charmer', 'Crushed Skull'],
  goldReward: 700,
  expReward: 1200,
  weaponChance: 1,
  progress_required: 0,
  icon: 'ra-gold-mine',
  stage: 'stageZero',
  spells: [
    {
      name: 'Next Room',
      cast: 5,
      cost: 0,
      coolDown: 10,
      manaRequired: 0,
      singleTarget: false,
      stage: 'stageOne',
      description: 'Change to Stage 1.',
      icon: 'ra-exit-door'
    },
  ],
  stageOne: {
    stage: 'stageOne',
    description: 'During Stage 1 the Tunnel will have traps that will target High Health Recruits',
    manaRegen: 1,
    power: 1,
    spells: [
      {
        name: 'Next Room',
        cast: 5,
        cost: 0,
        coolDown: 10,
        manaRequired: 60,
        singleTarget: false,
        stage: 'stageTwo',
        description: 'Change to Stage 2. (Only usable at 60 Mana)',
        icon: 'ra-exit-door'
      },
      {
        name: 'Crushing Walls',
        cast: 3,
        cost: 0,
        coolDown: 10,
        singleTarget: false,
        powerRatio: 1,
        percentage: 0.25,
        stunDuration: 3,
        description: 'Damage ALL Recruits for (25%) of the CURRENT Health on the Recruit with the Highest CURRENT Health, also Stuns ALL Recruits for 3 seconds (Stunned Recruits cannot attack)',
        icon: 'ra-crush'
      },
      {
        name: 'Snake Trap',
        cast: 3,
        cost: 0,
        coolDown: 5,
        powerRatio: 1,
        percentage: 0.2,
        description: 'Damage ALL Recruits for (20%) of their Max Health and then Poison them for (60%) of their Max Health over 15 seconds. (Only usable if there is A Recruit above (50%) Health). Also Damages the Player for (5%) Health.',
        icon: 'ra-snake'
      },
      {
        name: 'Dart Trap',
        cast: 3,
        cost: 0,
        coolDown: 5,
        powerRatio: 1,
        percentage: 0.5,
        description: 'Damage a random Recruit above (50%) Health for (50%) of their Max Health',
        icon: 'ra-arrow-flights'
      }
    ]
  },
  stageTwo: {
    stage: 'stageTwo',
    description: 'During Stage 2 the Tunnel will have traps that will target Low Health Recruits',
    manaRegen: 1,
    power: 2,
    spells: [
      {
        name: 'Next Room',
        cast: 5,
        cost: 0,
        coolDown: 10,
        manaRequired: 120,
        singleTarget: false,
        description: 'Change to Stage 3. (Only Usable at 120 Mana)',
        stage: 'stageThree',
        icon: 'ra-exit-door'
      },
      {
        name: 'Crumbling Walls',
        cast: 3,
        cost: 0,
        coolDown: 10,
        singleTarget: false,
        powerRatio: 1,
        stunDuration: 3,
        description: 'Damage ALL Recruits for (50%) of the CURRENT Health of the Recruit with the Lowest CURRENT Health, also Stuns ALL Recruits for 3 seconds (Stunned Recruits cannot attack)',
        icon: 'ra-falling-rocks'
      },
      {
        name: 'Spike Trap',
        cast: 3,
        cost: 0,
        coolDown: 10,
        powerRatio: 1000000,
        description: 'Kill a Recruit that is BELOW (20%) Health. If All Recruits are dead, Kill the Player',
        icon: 'ra-spiked-trunk'
      },
      {
        name: 'Snake Trap',
        cast: 3,
        cost: 0,
        coolDown: 5,
        powerRatio: 1,
        percentage: 0.3,
        description: 'Damage ALL Recruits for (30%) of their Max Health and then Poison them for (60%) of their Max Health over 15 seconds. (Only usable if there is A Recruit above (50%) Health). Also Damages the Player for (5%) Health.',
        icon: 'ra-snake'
      },
    ]
  },
  stageThree: {
    stage: 'stageThree',
    description: 'During Stage 3 the Tunnel will use a mix of traps from the previous stages. The Tunnel is Defeated once they reach 180 Mana',
    manaRegen: 1,
    power: 3,
    spells: [
      {
        name: 'Escape!',
        cast: 5,
        cost: 5,
        coolDown: 10,
        manaRequired: 180,
        singleTarget: false,
        powerRatio: 10000000,
        description: 'The Player Wins (By Escaping)',
        icon: 'ra-journey'
      },
      {
        name: 'Dart Trap',
        cast: 3,
        cost: 0,
        coolDown: 5,
        powerRatio: 1,
        percentage: 0.5,
        description: 'Damage a random Recruit above (50%) Health for (50%) of their Max Health',
        icon: 'ra-arrow-flights'
      },
      {
        name: 'Spike Trap',
        cast: 3,
        cost: 0,
        coolDown: 10,
        powerRatio: 1000000,
        description: 'Kill a Recruit that is BELOW (20%) Health, If All Recruits are dead, Kill the Player',
        icon: 'ra-spiked-trunk'
      },
      {
        name: 'Snake Trap',
        cast: 3,
        cost: 0,
        coolDown: 5,
        powerRatio: 1,
        percentage: 0.3,
        description: 'Damage ALL Recruits for (30%) of their Max Health and then Poison them for (60%) of their Max Health over 15 seconds. (Only usable if A Recruit is above (50%) Health). Also Damages the Player for (5%) Health.',
        icon: 'ra-snake'
      },
    ]
  }
}
