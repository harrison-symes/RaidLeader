const router = require('express').Router()
const {decode} = require('../auth/token')

const recruitsDb = require('../db/recruits')

router.get('/', decode, (req, res) => {
  recruitsDb.getRecruits(req.user.user_id)
    .then(recruits => res.json(recruits))
})

router.post('/', decode, (req, res) => {
  const {name, heroClass} = req.body
  console.log(req.body);
  recruitsDb.addRecruit(req.user.user_id, name, 1, heroClass)
    .then(recruit => res.json(recruit))
})

router.put('/weapons', decode, (req, res) => {
  recruitsDb.equipWeapon(req.body.id, req.body.weapon_id)
    .then(() => res.sendStatus(200))
})

module.exports = router
