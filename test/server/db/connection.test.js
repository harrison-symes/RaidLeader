test('test connection with no NODE_ENV', () => {
  delete process.env.NODE_ENV
  console.log(process.env.NODE_ENV);
  const actual = require('../../../server/db/connection').client.config

  var expected = require('../../../knexfile').development
  // console.log({actual, expected});
  // console.log(actual.client.config);
  expect(actual).toEqual(expected)
})
