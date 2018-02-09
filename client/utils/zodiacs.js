const zodiacs = [
  'Aries',
  'Taurus',
  'Gemini',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpio',
  'Saggitarius',
  'Capricorn',
  'Aquarius',
  'Pisces'
]

export function getZodiacs() {
  return zodiacs
}

const zodiacData = {
  Aries: {
    health: 0.1,
    power: -0.1,
    speed: 0
  },
  Taurus: {
    health: 0,
    power: 0.1,
    speed: -0.1
  },
  Gemini: {
    health: -0.1,
    power: 0,
    speed: 0.1
  },
  Cancer: {
    health: 0.1,
    power: 0,
    speed: -0.1
  },
  Leo: {
    health: -0.1,
    power: 0.1,
    speed: 0
  },
  Virgo: {
    health: 0,
    power: -0.1,
    speed: 0.1
  },
  Libra: {
    health: 0.1,
    power: 0.1,
    speed: -0.2
  },
  Scorpio: {
    health: -0.2,
    power: 0.1,
    speed: 0.1
  },
  Saggitarius: {
    health: 0.1,
    power: -0.2,
    speed: 0.1
  },
  Capricorn: {
    health: -0.1,
    power: -0.1,
    speed: 0.2
  },
  Aquarius: {
    health: 0.2,
    power: -0.1,
    speed: -0.1
  },
  Pisces: {
    health: -0.1,
    power: 0.2,
    speed: -0.1
  }
}

export function getZodiacData (zodiac) {
  return zodiacData[zodiac]
}
