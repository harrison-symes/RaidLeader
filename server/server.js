var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')


var greetings = require('./routes/greeting')

var server = express()


server.use(bodyParser.json())
server.use(express.static(path.join(__dirname, '../public')))

server.use('/api/greetings', greetings)

module.exports = server
