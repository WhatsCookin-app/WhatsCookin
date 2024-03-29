const router = require('express').Router()
const {User, channelUser, Event, Recipe} = require('../db/models')
const isUserMiddleware = require('./isUserMiddleware')
const Sequelize = require('sequelize')
const nodemailer = require('nodemailer')
const faker = require('faker')
const moment = require('moment')
const {faMonument} = require('@fortawesome/free-solid-svg-icons')

// var sequelize = new Sequelize(connStr, {
//   dialectOptions: {
//       useUTC: false //for reading from database
//   },
//   timezone: '+08:00' //for writing to database
// });
const Op = Sequelize.Op

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/profiles', isUserMiddleware, async (req, res, next) => {
  try {
    let lookupValue = req.query.profiles.toLowerCase()
    const users = await User.findAll({
      limit: 10,
      where: {
        [Op.or]: [
          {
            firtName: Sequelize.where(
              Sequelize.fn('LOWER', Sequelize.col('firstName')),
              'LIKE',
              '%' + lookupValue + '%'
            )
          },
          {
            lastName: Sequelize.where(
              Sequelize.fn('LOWER', Sequelize.col('lastName')),
              'LIKE',
              '%' + lookupValue + '%'
            )
          },
          {
            userName: Sequelize.where(
              Sequelize.fn('LOWER', Sequelize.col('userName')),
              'LIKE',
              '%' + lookupValue + '%'
            )
          }
        ]
      }
    })

    res.json(users)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      profilePicture: req.body.profilePicture
    })

    res.json(user)
  } catch (err) {
    next(err)
  }
})

//get a user's events
router.get('/:id/events', async (req, res, next) => {
  try {
    console.log('now: ', moment())
    console.log('now date', new Date())
    const events = await Event.findAll({
      where: {
        [Op.or]: [{organizerId: req.params.id}, {guestId: req.params.id}],
        eventDate: {
          [Op.gte]: new Date()
        }
      },
      include: [
        {
          model: User,
          as: 'organizer'
        },
        {
          model: User,
          as: 'guest'
        }
      ]
    })
    res.json(events)
  } catch (err) {
    next(err)
  }
})

//we have to mount it on state
// router.get('/:id/events/:eventId', async)
router.post('/:id/events', async (req, res, next) => {
  try {
    const {
      name,
      description,
      eventDate,
      organizerId,
      guestId,
      roomId,
      timezone
    } = req.body
    const current_tz = moment.tz.guess()

    const events = await Event.create({
      name,
      description,
      eventDate: moment.utc(moment.tz(eventDate, timezone)).format(),
      organizerId,
      guestId,
      roomId
    })
    res.json(events)
  } catch (err) {
    next(err)
  }
})

//id is for userId but this is for updating an event
router.put('/events/:eventId', async (req, res, next) => {
  try {
    req.body.eventDate = moment
      .utc(moment.tz(req.body.eventDate, req.body.timezone))
      .format()
    let updatedEvent = await Event.update(req.body, {
      where: {
        id: req.params.eventId
      },
      returning: true
    })
    res.send(updatedEvent[1][0])
  } catch (err) {
    next(err)
  }
})

//User is able to edit their userName & profilePicture

router.put('/', async (req, res, next) => {
  try {
    await req.user.update({
      userName: req.body.userName || req.user.userName,
      profilePicture: req.body.profilePicture || req.user.profilePicture
    })
    res.send(req.user)
  } catch (err) {
    next(err)
  }
})

router.post('/add', isUserMiddleware, async (req, res, next) => {
  try {
    const userChannel = await channelUser.findOrCreate({
      where: {
        userId: req.body.userId,
        channelId: req.body.channelId
      }
    })

    res.json('success')
  } catch (error) {
    next(error)
  }
})

router.post('/forgotpassword', async (req, res, next) => {
  try {
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'gh.whatscookin@gmail.com',
        pass: process.env.GOOGLE_ACCOUNT_PASSWORD
      }
    })
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    })
    if (!user) {
      return res.sendStatus(401)
    }
    const password = faker.internet.password()
    await user.update({
      password
    })
    await transporter.sendMail({
      from: '<no-reply@whatscookin.herokuapp.com>', // sender address
      to: req.body.email, // list of receivers
      subject: 'Reset Password', // Subject line
      text: `Your new password: ${password}`, // plain text body
      html: `<b>Your new password: ${password}</b>` // html body
    })
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

router.delete('/events/:eventId', async (req, res, next) => {
  try {
    const singleEvent = await Event.findByPk(req.params.eventId)
    console.log(singleEvent)
    if (
      singleEvent.organizerId === req.user.id ||
      singleEvent.guestId === req.user.id
    ) {
      await singleEvent.destroy()
      res.json('Event deleted')
    } else {
      const err = new Error('Only the event participants can delete this event')
      err.status = 401
      return next(err)
    }
  } catch (err) {
    next(err)
  }
})

//get a user's recipes
router.get('/:id/recipes', async (req, res, next) => {
  try {
    const recipes = await Recipe.findAll({
      where: {
        ownerId: req.params.id
      }
    })
    res.json(recipes)
  } catch (err) {
    next(err)
  }
})

router.get('/:roomId/video/event', async (req, res, next) => {
  try {
    const event = await Event.findOne({
      where: {
        roomId: req.params.roomId
      },
      include: [
        {
          model: User,
          as: 'organizer'
        },
        {
          model: User,
          as: 'guest'
        }
      ]
    })
    res.json(event)
  } catch (err) {
    next(err)
  }
})
