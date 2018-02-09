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
    speed: 0,
    icon: 'ra-aries'
  },
  Taurus: {
    health: 0,
    power: 0.1,
    speed: -0.1,
    icon: 'ra-taurus'
  },
  Gemini: {
    health: -0.1,
    power: 0,
    speed: 0.1,
    icon: 'ra-gemini'
  },
  Cancer: {
    health: 0.1,
    power: 0,
    speed: -0.1,
    icon: 'ra-cancer'
  },
  Leo: {
    health: -0.1,
    power: 0.1,
    speed: 0,
    icon: 'ra-leo'
  },
  Virgo: {
    health: 0,
    power: -0.1,
    speed: 0.1,
    icon: 'ra-virgo'
  },
  Libra: {
    health: 0.1,
    power: 0.1,
    speed: -0.2,
    icon: 'ra-libra'
  },
  Scorpio: {
    health: -0.2,
    power: 0.1,
    speed: 0.1,
    icon: 'ra-scorpio'
  },
  Saggitarius: {
    health: 0.1,
    power: -0.2,
    speed: 0.1,
    icon: 'ra-sagittarius'
  },
  Capricorn: {
    health: -0.1,
    power: -0.1,
    speed: 0.2,
    icon: 'ra-capricorn'
  },
  Aquarius: {
    health: 0.2,
    power: -0.1,
    speed: -0.1,
    icon: 'ra-aquarius'
  },
  Pisces: {
    health: -0.1,
    power: 0.2,
    speed: -0.1,
    icon: 'ra-pisces'
  }
}

export function getZodiacData (zodiac) {
  return zodiacData[zodiac]
}
