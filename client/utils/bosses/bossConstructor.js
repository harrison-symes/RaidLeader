export default function createBoss (name, initHp, hp, initPower, power, initArmor, armor, maxArmor, armorRegen, mana, maxMana, manaRegen ) {
  return {
    name,
    initHp: hp,
    hp,
    initPower: power,
    power,
    initArmor: armor,
    armor,
    mana,
    maxMana,
    manaRegen,
    armorRegen,
    isCasting: false,
    bossTarget: null,
    spells: [
      {
        name: 'Swipe',
        cast: 3,
        cost: 3,
        coolDown: 10,
        type: 'damage',
        singleTarget: false,
        powerRatio: 0.5,
        onCooldown: false
      },
      {
        name: 'Protect',
        cast: 0.5,
        cost: 1,
        coolDown: 5,
        type: 'armor',
        singleTarget: false,
        powerRatio: 1,
        onCooldown: false
      },
      {
        name: 'Bite',
        cost: 0,
        cast: 5,
        coolDown: 1,
        powerRatio: 1,
        type: 'damage',
        singleTarget: true,
        onCooldown: false
      }
    ]
  }
}
