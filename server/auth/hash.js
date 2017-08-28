var bcrypt = require('bcrypt')

function generate(password, cb) {
  bcrypt.hash(password, 12, cb)
}

function compare (hash, password) {
  
}

module.exports = {
  generate
}
