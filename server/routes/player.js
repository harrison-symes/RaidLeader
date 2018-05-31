const router = require('express').Router()

const playerDb = require('../db/player')
const {addRecruit} = require('../db/recruits')
const {addSpell} = require('../db/spells')
const {decode} = require('../auth/token')

router.get('/gold', decode, (req, res) => {
  playerDb.getPlayerGold(req.user.user_id)
    .then((user) => res.json(user.gold))
})

router.put('/gold', decode, (req, res) => {
  playerDb.getPlayerGold(req.user.user_id)
    .then((user) => {
      playerDb.updatePlayerGold(req.user.user_id, user.gold + req.body.gold)
        .then(() => res.sendStatus(202))
    })
})

router.get('/weapons', decode, (req, res) => {
  playerDb.getWeapons(req.user.user_id)
  .then(weapons => res.status(200).json(weapons))
})

router.post('/weapons', decode, (req, res) => {
  playerDb.addWeapon(req.user.user_id, req.body.name, req.body.level)
    .then(weapon => res.status(201).json(weapon))
})

router.delete('/weapons', decode, (req, res) => {
  playerDb.delWeapon(req.body.id)
    .then(() => res.sendStatus(202))
})

router.post('/getStarted', decode, (req, res) => {
  addRecruit(req.user.user_id, req.body.name, 1, 'Paladin', req.body.zodiac)
    .then(recruit => {
      addSpell(req.user.user_id, 'Heal')
        .then(spell => {
          playerDb.addWeapon(req.user.user_id, 'Training Staff', 1)
            .then(weapon => {
              res.status(201).json({recruit, spell, weapon})
            })
        })
    })
})

router.get('/experience', decode, (req, res) => {
  playerDb.getPlayer(req.user.user_id)
    .then((player) => {
      res.status(200).json(player.experience)
    })
})

router.put('/experience', decode, (req, res) => {
  playerDb.playerGainExperience(req.user.user_id, req.body.experience)
    .then(() => res.sendStatus(200))
})

router.get('/gems', decode, (req, res) => {
  playerDb.getPlayer(req.user.user_id)
    .then(player => res.status(200).json(player.gems))
})

router.put('/gems', decode, (req, res) => {
  playerDb.playerGainGems(req.user.user_id, req.body.gems)
    .then(() => res.sendStatus(200))
})

router.get('/traits', decode, (req, res) => {
  playerDb.getPlayerTraits(req.user.user_id)
    .then(traits => res.json(traits))
})

router.post('/traits', decode, (req, res) => {
  playerDb.insertTrait(req.user.user_id, req.body.name)
    .then(() => res.sendStatus(201))
    .catch(err => console.log({err}))
})

router.get('/wake', (req, res) => {
  res.sendStatus(200)
})

module.exports = router
