import {getZodiacData} from './zodiacs'

const createMember = (name, level, id, weapon_id, zodiac, heroClass, hp, power, speed) => {
  var zData = getZodiacData(zodiac)
  console.log({zData})
  power+=Math.floor(power*zData.power)
  hp+=Math.floor(hp*zData.health)
  speed+=Math.floor(speed*zData.speed)
  var member = {
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
    weapon_id,
    zodiac,
    effects: []
  }
  return member
}

const createPaladin = (name, level, id, weapon_id, zodiac) => createMember(name, level, id, weapon_id, zodiac, 'Paladin', (level + 1) * 40, (level + 1) * 15, 2)

const createPriest = (name, level, id, weapon_id, zodiac) => createMember(name, level, id, weapon_id, zodiac, 'Priest', (level + 1) * 30, level * 5, 4 + level)

const createMonk = (name, level, id, weapon_id, zodiac) => createMember(name, level, id, weapon_id, zodiac, 'Monk', (level + 1) * 35, (level*20) + 20, 0.5)

const createRogue = (name, level, id, weapon_id, zodiac) => createMember(name, level, id, weapon_id, zodiac, 'Rogue', (level + 1) * 35, level * 10, 4 + level)

const createMage = (name, level, id, weapon_id, zodiac) => createMember(name, level, id, weapon_id, zodiac, 'Mage', (level + 1) * 30, level * 30, 2)

const createWarrior = (name, level, id, weapon_id, zodiac) => createMember(name, level, id, weapon_id, zodiac, 'Warrior', (level + 1) * 40, level * 30, 2.5)

const createWarlock = (name, level, id, weapon_id, zodiac) => createMember(name, level, id, weapon_id, zodiac, 'Warlock', (level + 1) * 35, level * 30, 3)


module.exports = ({name, heroClass, level, id, weapon_id, zodiac}) => {
  switch(heroClass) {
    case 'Paladin': return createPaladin(name, level, id, weapon_id, 'Scorpio')
    case 'Priest': return createPriest(name, level, id, weapon_id, 'Scorpio')
    case 'Monk': return createMonk(name, level, id, weapon_id, 'Scorpio')
    case 'Rogue': return createRogue(name, level, id, weapon_id, 'Scorpio')
    case 'Mage': return createMage(name, level, id, weapon_id, 'Scorpio')
    case 'Warrior': return createWarrior(name, level, id, weapon_id, 'Scorpio')
    case 'Warlock': return createWarlock(name, level, id, weapon_id, 'Scorpio')
    default: return null
  }
}
