const createMember = (name, heroClass, hp, power, speed) => (
  {
    name,
    heroClass,
    initHp: hp,
    hp,
    initSpeed: speed,
    speed,
    initPower: power,
    power
  }
)

const createPaladin = (name, level) => createMember(name, 'Paladin', (level + 1) * 5, 1 + (level * 2), 3)

const createPriest = (name, level) => createMember(name, 'Priest', (level + 1) * 3, level, 5)

const createMonk = (name, level) => createMember(name, 'Monk', (level + 1) * 5, level, 3)

const createRogue = (name, level) => createMember(name, 'Rogue', (level + 1) * 3, level, 4 + level)

const createMage = (name, level) => createMember(name, 'Mage', (level + 1) * 2, level * 2, 3)

const createWarrior = (name, level) => createMember(name, 'Warrior', (level + 1) * 5, level * 3, 2)

const createWarlock = (name, level) => createMember(name, 'Warlock', (level + 1) * 3, level * 2, 3)


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
