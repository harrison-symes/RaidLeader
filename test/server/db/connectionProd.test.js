test('development connection with production NODE_ENV', () => {
  process.env.NODE_ENV = 'production'

  const actual = require('../../../server/db/connection').client.config

  var expected = require('../../../knexfile').production
  expect(actual).toEqual(expected)
})
