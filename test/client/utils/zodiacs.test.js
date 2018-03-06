import {getZodiacs, getZodiacData} from '../../../client/utils/zodiacs'

const list = [
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

test('getZodiacs', () => {
  const zodiacs = getZodiacs()
  expect(zodiacs).toHaveLength(12)
  expect(zodiacs).toEqual(list)
})

test('getZodiacData', () => {
  list.forEach(zodiac => {
    const data = getZodiacData(zodiac)
    expect(data).toBeTruthy()
    expect(data.hasOwnProperty('health')).toBeTruthy()
    expect(data.hasOwnProperty('power')).toBeTruthy()
    expect(data.hasOwnProperty('speed')).toBeTruthy()
    expect(data.hasOwnProperty('icon')).toBeTruthy()
  })
  expect(getZodiacData()).toBeFalsy()
})
