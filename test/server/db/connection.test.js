test('test connection with no NODE_ENV', () => {
  delete process.env.NODE_ENV
  const actual = require('../../../server/db/connection').client.config

  var expected = require('../../../knexfile').development
  expect(actual).toEqual(expected)
})
