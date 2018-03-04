test('development connection with production NODE_ENV', () => {
  process.env.NODE_ENV = 'production'

  const actual = require('../../../server/db/connection').client.config

  var expected = require('../../../knexfile').production
  // console.log({actual, expected});
  // console.log(actual.client.config);
  expect(actual).toEqual(expected)
})
