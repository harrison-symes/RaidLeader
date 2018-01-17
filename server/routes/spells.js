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

module.exports = router
