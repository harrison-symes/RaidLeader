const router = require('express').Router()
const {decode} = require('../auth/token')

const dungeonsDb = require('../db/dungeons')

router.get('/', decode, (req, res) => {
  console.log({dungeonsDb});
  dungeonsDb.getDungeons()
    .then(dungeons => {
      dungeonsDb.getCompletedDungeons(req.user.user_id)
        .then(completed => {
          dungeonsDb.getBosses()
          .then(bosses => {
            dungeons = dungeons.map(dungeon => {
              dungeon.bosses = bosses.filter(boss => boss.dungeon_id == dungeon.id)
              dungeon.isCompleted = completed.find(complete => complete.dungeon_id == dungeon.id)
              return dungeon
            })
            res.json(dungeons)
          })
        })
    })
})

module.exports = router
