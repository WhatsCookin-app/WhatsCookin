const router = require('express').Router()
const {channelUser, Channel} = require('../db/models')
module.exports = router

//Get all of a User's Channels with the Channel eager loaded
//likely dont need the isUserMiddleware
router.get('/', async (req, res, next) => {
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

//Get a single a User's Channels with the Channel eager loaded
router.get('/:channelId', async (req, res, next) => {
  try {
    const user = req.user.id
    const channel = await channelUser.findOne({
      where: {
        userId: user,
        channelId: req.params.channelId,
      },
      include: Channel,
    })
    res.json(channel)
  } catch (err) {
    next(err)
  }
})

//Create a new channel and new channelUser associated with this channel
router.post('/:channelId', async (req, res, next) => {
  try {
    const {name, description, imageUrl, isPrivate} = req.body

    const newChannel = await Channel.create({
      name,
      description,
      imageUrl,
      isPrivate,
      //will be req.user.id when not using postman
      userId: req.user.id,
    })

    await channelUser.create({
      //will be req.user.id when not using postman
      userId: req.user.id,
      channelId: newChannel.dataValues.id,
    })

    res.send(newChannel)
  } catch (err) {
    next(err)
  }
})

//Update a channel make sure
//switch to :channelId once rendering on the front end
//likely wont need the model method either
router.put('/:channelId', async (req, res, next) => {
  try {
    let result = await Channel.isOwner(req.user.id, req.params.channelId)

    if (result) {
      let updatedChannel = await Channel.update(req.body, {
        where: {
          id: req.params.channelId,
        },
        returning: true,
      })

      return res.send(updatedChannel[1][0])
    } else {
      const err = new Error('Only the channel owner can edit this channel')
      err.status = 401
      return next(err)
    }
  } catch (err) {
    next(err)
  }
})

// delete a channel
router.delete('/:channelId', async (req, res, next) => {
  try {
    const userId = req.user.id

    const channel = await Channel.findByPk(req.params.channelId)

    if (channel.ownerId === userId) {
      await channel.destroy()
      res.json('Channel deleted')
    } else {
      const err = new Error('Only the channel owner can delete this channel')
      err.status = 401
      return next(err)
    }
  } catch (err) {
    next(err)
  }
})
