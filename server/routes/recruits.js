const router = require('express').Router()
const {decode} = require('../auth/token')

const recruitsDb = require('../db/recruits')

router.get('/', decode, (req, res) => {
  console.log(req.user);
  recruitsDb.getRecruits(req.user.user_id)
    .then(recruits => res.json(recruits))
})

module.exports = router
