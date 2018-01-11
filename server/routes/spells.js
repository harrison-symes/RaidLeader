const router = require('express').Router()
const {decode} = require('../auth/token')

const spellsDb = require('../db/spells')

router.get('/', decode, (req, res) => {
  console.log(req.user);
  spellsDb.getSpells(req.user.user_id)
    .then(spells => res.json(spells))
})

module.exports = router
