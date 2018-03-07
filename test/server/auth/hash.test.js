
const hash = require('../../../server/auth/hash')

test('hash has the required functions', () => {
  expect(hash.hasOwnProperty('compare')).toBeTruthy()
  expect(hash.hasOwnProperty('generate')).toBeTruthy()
})

test('generate hash', (done) => {
  hash.generate('TEST PASSWORD', (err, actual) => {
    expect(err).toBeFalsy()
    expect(actual).toBeTruthy()
    expect(actual).not.toBe('TEST PASSWORD')
    done()
  })
})

test('compare hash (true)', (done) => {
  const fakeHash = '$2a$12$7qxbL1CVgW1ZDnUr2YypJ.vp3imQrznWsoP2HSdh2NpDSv7E6D5li'
  const expected = 'TEST PASSWORD'
  hash.compare(expected, fakeHash, (err, match) => {
    expect(err).toBeFalsy()
    expect(match).toBe(true)
    done()
  })
})

test('compare hash (false)', (done) => {
  const fakeHash = '$2a$12$7qxbL1CVgW1ZDnUr2YypJ.vp3imQrznWsoP2HSdh2NpDSv7E6D5li'
  const expected = 'TEST_PASSWORD'
  hash.compare(expected, fakeHash, (err, match) => {
    expect(err).toBeFalsy()
    expect(match).toBe(false)
    done()
  })
})
