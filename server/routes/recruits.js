const router = require('express').Router()
const {decode} = require('../auth/decode')

const recruitsDb = require('../db/recruits')

router.get('/', decode, (req, res) => {
  console.log(req.user)
  recruitsDb(req.user.id)
    .then(recruits => res.json(recruits))
})

module.exports = router
