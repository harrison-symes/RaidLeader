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
        .then(() => res.sendStatus(200))
    })
})

router.post('/weapon', decode, (req, res) => {
  playerDb.addWeapon(req.user.user_id, req.body.name, req.body.level)
    .then(id => res.json(id[0]))
})

router.get('/weapons', decode, (req, res) => {
  playerDb.getWeapons(req.user.user_id)
    .then(weapons => res.json(weapons))
})

router.delete('/weapons', decode, (req, res) => {
  console.log(req.body);
  playerDb.delWeapon(req.body.id)
    .then(() => {
      playerDb.getPlayerGold(req.user.user_id)
      .then((user) => {
        playerDb.updatePlayerGold(req.user.user_id, user.gold + req.body.value)
        .then(() => res.sendStatus(200))
      })
    })
})

router.post('/getStarted', decode, (req, res) => {
  addRecruit(req.user.user_id, req.body.name, 1, 'Paladin', req.body.zodiac)
    .then(recruit => {
      addSpell(req.user.user_id, 'Heal')
        .then(spell => {
          playerDb.addWeapon(req.user.user_id, 'Training Staff', 1)
            .then(weapon => {
              res.json({recruit, spell, weapon})
            })
        })
    })
})

module.exports = router
