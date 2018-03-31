import {getZodiacData} from './zodiacs'

const createMember = (name, level, id, weapon_id, zodiac, heroClass, hp, power, speed) => {
  var zData = getZodiacData(zodiac)
  power*=10
  hp*=10
  power+=(Math.floor(power*zData.power))
  hp+=(Math.floor(hp*zData.health))
  speed+=Math.floor(speed*zData.speed)
  speed= speed/10
  hp = hp/10
  power = power/10
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

const createPaladin = (name, level, id, weapon_id, zodiac) => createMember(name, level, id, weapon_id, zodiac, 'Paladin', (level + 1) * 45, (level + 1) * 5, 30)

const createPriest = (name, level, id, weapon_id, zodiac) => createMember(name, level, id, weapon_id, zodiac, 'Priest', (level + 1) * 30, (level + 1) * 5, 25)

const createMonk = (name, level, id, weapon_id, zodiac) => createMember(name, level, id, weapon_id, zodiac, 'Monk', (level + 1) * 35, (level + 1) * 10 , 10)

const createRogue = (name, level, id, weapon_id, zodiac) => createMember(name, level, id, weapon_id, zodiac, 'Rogue', (level + 1) * 35, (level + 1) * 5, 50)

const createMage = (name, level, id, weapon_id, zodiac) => createMember(name, level, id, weapon_id, zodiac, 'Mage', (level + 1) * 30, (level + 1) * 10, 25)

const createWarrior = (name, level, id, weapon_id, zodiac) => createMember(name, level, id, weapon_id, zodiac, 'Warrior', (level + 1) * 40, (level + 1) * 10, 25)

const createWarlock = (name, level, id, weapon_id, zodiac) => createMember(name, level, id, weapon_id, zodiac, 'Warlock', (level + 1) * 35, (level + 1)* 15, 30)

const createHunter = (name, level, id, weapon_id, zodiac) => createMember(name, level, id, weapon_id, zodiac, 'Hunter', (level + 1) * 35, (level + 1) * 10, 15)

const createShaman = (name, level ,id, weapon_id, zodiac) => createMember(name, level, id, weapon_id, zodiac, 'Shaman', (level + 1) * 35, (level + 1) * 20, 10)

const createBard = (name, level ,id, weapon_id, zodiac) => createMember(name, level, id, weapon_id, zodiac, 'Bard', (level + 1) * 35, (level + 1) * 10, 20)

const createNecromancer = (name, level ,id, weapon_id, zodiac) => createMember(name, level, id, weapon_id, zodiac, 'Necromancer', (level + 1) * 35, (level + 1) * 10, 25)


module.exports = ({name, heroClass, level, id, weapon_id, zodiac}) => {
  switch(heroClass) {
    case 'Paladin': return createPaladin(name, level, id, weapon_id, zodiac)
    case 'Priest': return createPriest(name, level, id, weapon_id, zodiac)
    case 'Monk': return createMonk(name, level, id, weapon_id, zodiac)
    case 'Rogue': return createRogue(name, level, id, weapon_id, zodiac)
    case 'Mage': return createMage(name, level, id, weapon_id, zodiac)
    case 'Warrior': return createWarrior(name, level, id, weapon_id, zodiac)
    case 'Warlock': return createWarlock(name, level, id, weapon_id, zodiac)
    case 'Hunter': return createHunter(name, level, id, weapon_id, zodiac)
    case 'Shaman': return createShaman(name, level ,id, weapon_id, zodiac)
    case 'Bard': return createBard(name, level, id, weapon_id, zodiac)
    case 'Necromancer': return createNecromancer(name, level, id, weapon_id, zodiac)
    default: return null
  }
}
