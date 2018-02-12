const router = require('express').Router()
const {decode} = require('../auth/token')

const spellsDb = require('../db/spells')

router.get('/', decode, (req, res) => {
  spellsDb.getSpells(req.user.user_id)
    .then(spells => res.json(spells))
})

router.post('/', decode, (req, res) => {
  spellsDb.addSpell(req.user.user_id, req.body.name)
    .then(spell => res.json(spell))
})

router.delete('/', decode, (req, res) => {
  console.log(req.body);
  spellsDb.deleteSpell(req.user.user_id, req.body.name)
    .then(spell => res.sendStatus(200))
})

module.exports = router
