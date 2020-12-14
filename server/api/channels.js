const router = require('express').Router()
const {channelUser, Channel, Recipe} = require('../db/models')

module.exports = router
const Sequelize = require('sequelize')
const User = require('../db/models/user')
const isUserMiddleware = require('./isUserMiddleware')

//Get all of a User's Channels with the Channel eager loaded
//likely dont need the isUserMiddleware
router.get('/', async (req, res, next) => {
  try {
    const user = req.user.id
    const channels = await channelUser.findAll({
      where: {
        userId: user
      },
      include: Channel
    })
    res.json(channels)
  } catch (err) {
    next(err)
  }
})

router.get('/search', async (req, res, next) => {
  try {
    const channels = await Channel.findAll({
      where: {
        name: Sequelize.where(
          Sequelize.fn('LOWER', Sequelize.col('name')),
          'LIKE',
          '%' + req.query.c + '%'
        ),
        isPrivate: false
      }
    })
    res.json(channels)
  } catch (err) {
    next(err)
  }
})

//unjoined public channels-LIDIA
router.get('/browse', async (req, res, next) => {
  try {
    const publicChannels = await Channel.findAll({
      where: {
        isPrivate: false
      },
      include: {model: User, as: 'members'}
    })
    const myChannels = await req.user.getMembers().map(channel => channel.id)
    const unjoinedChannels = publicChannels.filter(
      channel => !myChannels.includes(channel.id)
    )
    res.send(unjoinedChannels)
  } catch (err) {
    next(err)
  }
})

//User will be able to view public channels that they are not in
//Users cannot view private channels they are not in
router.get('/:channelId', async (req, res, next) => {
  try {
    const channel = await Channel.findByPk(req.params.channelId, {
      include: {
        model: User,
        as: 'members'
      }
    })
    if (
      channel.isPrivate &&
      !channel.members.find(user => user.id === req.user.id)
    ) {
      return res.sendStatus(401)
    }
    res.json({channel})
  } catch (err) {
    next(err)
  }
})

// get all recipes of a channel
// watchout for bug!!!!! include:
// include: [
//   {
//     model: Channel,
//     where: {
//       id: req.params.channelId
//     }
//   },
//   {
//     model: User,
//     as: 'owner'
//   }
// ]
router.get('/:channelId/recipes', async (req, res, next) => {
  try {
    const recipes = await Recipe.findAll({
      include: [
        {
          model: Channel,
          where: {
            id: req.params.channelId
          }
        },
        {
          model: User,
          as: 'owner'
        }
      ]
    })
    res.json(recipes)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {name, description, imageUrl, isPrivate} = req.body

    const newChannel = await Channel.create({
      name,
      description,
      imageUrl,
      isPrivate,
      userId: req.user.id
    })

    await channelUser.create({
      //will be req.user.id when not using postman
      userId: req.user.id,
      channelId: newChannel.dataValues.id
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

    if (result.dataValues.id) {
      let updatedChannel = await Channel.update(req.body.channel, {
        where: {
          id: req.params.channelId
        },
        returning: true
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

// new user joining a channel
router.put('/join/:channelId', async (req, res, next) => {
  try {
    await channelUser.create({
      userId: req.user.id,
      channelId: req.params.channelId
    })
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

// //await channelUser.create({
//   userId: req.user.id,
//   channelId: req.params.channelId,
// })

// delete a channel

router.delete('/leave/:channelId', async (req, res, next) => {
  try {
    const channel = await channelUser.findOne({
      where: {
        userId: req.user.id,
        channelId: req.params.channelId
      }
    })

    await channel.destroy()
    res.json('Channel deleted')
  } catch (err) {
    next(err)
  }
})
router.delete('/:channelId', async (req, res, next) => {
  try {
    const userId = req.user.id

    const channel = await Channel.findByPk(req.params.channelId)

    if (channel.userId === userId) {
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
