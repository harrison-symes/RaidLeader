const getGreetings = (db) => {
  return db('greetings')
    .select('*')
}

module.exports = {
  getGreetings
}
