const {issue} = require('../../../server/auth/token')

process.env.JWT_SECRET = 'Krang'

jest.mock('../../../server/db/users', () => ({
  getUserByName: () => Promise.resolve({
    user_id: 1,
    user_name: 'TEST_USER',
    hash: '$2a$12$7qxbL1CVgW1ZDnUr2YypJ.vp3imQrznWsoP2HSdh2NpDSv7E6D5li'
  })
}))

jest.mock('../../../server/auth/hash', () => ({
  compare: (pass, hash, cb) => cb({message: 'TEST ERROR'})
}))


test('issue token working case', () => {
  const fakeRequest = {
    body: {
      user_name: 'TEST_USER',
      password: 'TEST PASSWORD'
    }
  }
  const fakeResponse = {
    status: (code) => {
      json: (obj) => {
        expect(code).toBe(500)
        expect(obj).toBeTruthy()
        expect(obj.message).toBe('TEST ERROR')
        expect(obj.hasOwnProperty('token')).ttoBeTruthy()
      }
    }
  }

  issue(fakeRequest, fakeResponse)
})
