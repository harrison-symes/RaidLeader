const createMember = (name, level, id, weapon_id, heroClass, hp, power, speed) => (
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
    id,
    weapon_id
  }
)

const createPaladin = (name, level, id, weapon_id) => createMember(name, level, id, weapon_id, 'Paladin', (level + 1) * 5, (level * 2), 3)

const createPriest = (name, level, id, weapon_id) => createMember(name, level, id, weapon_id, 'Priest', (level + 1) * 3, level, 5)

const createMonk = (name, level, id, weapon_id) => createMember(name, level, id, weapon_id, 'Monk', (level + 1) * 5, level, 1)

const createRogue = (name, level, id, weapon_id) => createMember(name, level, id, weapon_id, 'Rogue', (level + 1) * 3, level, 3 + level)

const createMage = (name, level, id, weapon_id) => createMember(name, level, id, weapon_id, 'Mage', (level + 1) * 2, level * 2, 3)

const createWarrior = (name, level, id, weapon_id) => createMember(name, level, id, weapon_id, 'Warrior', (level + 1) * 5, level * 3, 2)

const createWarlock = (name, level, id, weapon_id) => createMember(name, level, id, weapon_id, 'Warlock', (level + 1) * 3, level * 3, 3)


module.exports = ({name, heroClass, level, id, weapon_id}) => {
  switch(heroClass) {
    case 'Paladin': return createPaladin(name, level, id, weapon_id)
    case 'Priest': return createPriest(name, level, id, weapon_id)
    case 'Monk': return createMonk(name, level, id, weapon_id)
    case 'Rogue': return createRogue(name, level, id, weapon_id)
    case 'Mage': return createMage(name, level, id, weapon_id)
    case 'Warrior': return createWarrior(name, level, id, weapon_id)
    case 'Warlock': return createWarlock(name, level, id, weapon_id)
    default: return null
  }
}
