test('test connection with no NODE_ENV', () => {
  const actual = require('../../../server/db/connection').client.config

  var expected = require('../../../knexfile').test
  // console.log({actual, expected});
  // console.log(actual.client.config);
  expect(actual).toEqual(expected)
})
