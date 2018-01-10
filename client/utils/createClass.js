const createMember = (name, level, id, heroClass, hp, power, speed) => (
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
    isAlive: true,
    id
  }
)

const createPaladin = (name, level, id) => createMember(name, level, id, 'Paladin', (level + 1) * 5, (level * 2), 3)

const createPriest = (name, level, id) => createMember(name, level, id, 'Priest', (level + 1) * 3, level, 5)

const createMonk = (name, level, id) => createMember(name, level, id, 'Monk', (level + 1) * 5, level, 1)

const createRogue = (name, level, id) => createMember(name, level, id, 'Rogue', (level + 1) * 3, level, 4 + level)

const createMage = (name, level, id) => createMember(name, level, id, 'Mage', (level + 1) * 2, level * 2, 3)

const createWarrior = (name, level, id) => createMember(name, level, id, 'Warrior', (level + 1) * 5, level * 3, 2)

const createWarlock = (name, level, id) => createMember(name, level, id, 'Warlock', (level + 1) * 3, level * 3, 3)


module.exports = ({name, heroClass, level, id}) => {
  switch(heroClass) {
    case 'Paladin': return createPaladin(name, level, id)
    case 'Priest': return createPriest(name, level, id)
    case 'Monk': return createMonk(name, level, id)
    case 'Rogue': return createRogue(name, level, id)
    case 'Mage': return createMage(name, level, id)
    case 'Warrior': return createWarrior(name, level, id)
    case 'Warlock': return createWarlock(name, level, id)
    default: return null
  }
}
