const router = require('express').Router()
const {decode} = require('../auth/token')

const dungeonsDb = require('../db/dungeons')

router.get('/', decode, (req, res) => {
  dungeonsDb.getDungeons()
    .then(dungeons => {
      dungeonsDb.getCompletedDungeons(req.user.user_id)
        .then(completed => {
          dungeonsDb.getBosses()
          .then(bosses => {
            dungeons = dungeons.map(dungeon => {
              dungeon.bosses = bosses.filter(boss => boss.dungeon_id == dungeon.id)
              dungeon.isCompleted = !!completed.find(complete => complete.dungeon_id == dungeon.id)
              return dungeon
            })
            console.log({dungeons, completed, bosses});
            res.json(dungeons)
          })
        })
    })
})

router.post('/complete', decode, (req, res) => {
  dungeonsDb.dungeonComplete(req.user.user_id, req.body.dungeon_id)
    .then(() => res.sendStatus(201))
})

module.exports = router
