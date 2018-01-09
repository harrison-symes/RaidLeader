const createMember = (name, level, heroClass, hp, power, speed) => (
  {
    name,
    level,
    heroClass,
    initHp: hp,
    hp,
    initSpeed: speed,
    speed,
    initPower: power,
    power,
    isAlive: true
  }
)

const createPaladin = (name, level) => createMember(name, level, 'Paladin', (level + 1) * 5, (level * 2), 3)

const createPriest = (name, level) => createMember(name, level, 'Priest', (level + 1) * 3, level, 5)

const createMonk = (name, level) => createMember(name, level, 'Monk', (level + 1) * 5, level, 1)

const createRogue = (name, level) => createMember(name, level, 'Rogue', (level + 1) * 3, level, 4 + level)

const createMage = (name, level) => createMember(name, level, 'Mage', (level + 1) * 2, level * 2, 3)

const createWarrior = (name, level) => createMember(name, level, 'Warrior', (level + 1) * 5, level * 3, 2)

const createWarlock = (name, level) => createMember(name, level, 'Warlock', (level + 1) * 3, level * 3, 3)


module.exports = (name, heroClass, level) => {
  switch(heroClass) {
    case 'Paladin': return createPaladin(name, level)
    case 'Priest': return createPriest(name, level)
    case 'Monk': return createMonk(name, level)
    case 'Rogue': return createRogue(name, level)
    case 'Mage': return createMage(name, level)
    case 'Warrior': return createWarrior(name, level)
    case 'Warlock': return createWarlock(name, level)
    default: return null
  }
}
