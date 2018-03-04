const token = require('../../../server/auth/token')

jest.mock('express-jwt', () => (secretObj) => (req, res, next) => {
  next(secretObj)
} )

jest.mock('jsonwebtoken', () => ({
  sign: (user, secret, details) => ({
    user, secret, details
  })
}))

test('decode', (done) => {
  process.env.JWT_SECRET = 'TEST SECRET'
  const doneFunction = (actual) => {
    expect(actual.hasOwnProperty('secret')).toBeTruthy()
    done()
  }
  token.decode(null, null, doneFunction)
})

test('getSecret', () => {
  const mockFunction = (err, secret) => {
    expect(err).toBeFalsy()
    expect(secret).toBe('TEST SECRET')
  }

  token.getSecret(null, null, mockFunction)
})

test('createToken', () => {
  const user = {
    user_id: 1,
    user_name: 'TEST USER'
  }
  const secret = 'TEST SECRET'
  const expectedDetails = {
    expiresIn: '14d'
  }
  const actual = token.createToken(user, secret)
  expect(actual).toBeTruthy()
  console.log({actual});
  expect(actual).toEqual({
    user,
    secret,
    details: expectedDetails
  })
})
