const router = require('express').Router()
const {decode} = require('../auth/token')

const recruitsDb = require('../db/recruits')

router.get('/', decode, (req, res) => {
  recruitsDb.getRecruits(req.user.user_id)
    .then(recruits => res.json(recruits))
})

router.put('/weapons', decode, (req, res) => {
  recruitsDb.equipWeapon(req.body.id, req.body.weapon_id)
    .then(() => res.sendStatus(200))
})

module.exports = router
