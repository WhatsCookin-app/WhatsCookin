const router = require('express').Router()
const {channelUser, Channel} = require('../db/models')
const isUserMiddleware = require('./isUserMiddleware')
module.exports = router

router.get('/', isUserMiddleware, async (req, res, next) => {
  try {
    const user = req.user.id
    const channels = await channelUser.findAll({
      where: {
        userId: user,
      },
      include: Channel,
    })
    res.json(channels)
  } catch (err) {
    next(err)
  }
})
