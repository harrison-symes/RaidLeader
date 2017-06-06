var test = require('ava')
var request = require('supertest')

var createServer = require('../..server/server')
var setupDb = require('./setup-db')

setupDb(test,createServer)
