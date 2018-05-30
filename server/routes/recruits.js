const router = require('express').Router()
const {decode} = require('../auth/token')

const recruitsDb = require('../db/recruits')

router.get('/', decode, (req, res) => {
  recruitsDb.getRecruits(req.user.user_id)
    .then(recruits => res.json(recruits))
})

router.post('/', decode, (req, res) => {
  const {name, heroClass, zodiac} = req.body
  recruitsDb.addRecruit(req.user.user_id, name, 1, heroClass, zodiac)
    .then(recruit => res.status(201).json(recruit))
})

router.put('/weapons', decode, (req, res) => {
  recruitsDb.equipWeapon(req.body.id, req.body.weapon_id)
    .then(() => res.sendStatus(202))
})

router.put('/level', decode, (req, res) => {
  recruitsDb.levelUpRecruit(req.body.id, req.body.level )
    .then(recruit => res.status(202).json(recruit))
})

router.put('/:id/zodiac', decode, (req, res) => {
  recruitsDb.changeZodiac(req.params.id, req.body.zodiac)
    .then(recruit => res.status(200).json(recruit))
})

module.exports = router
