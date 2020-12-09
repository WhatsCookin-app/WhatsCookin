const router = require('express').Router()
const {User, Event} = require('../db/models')
const {Sequelize, Op} = require('sequelize')
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
    const user = await User.create(req.body)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

//get a user's events
router.get('/:id/events', async (req, res, next) => {
  try {
    const events = await Event.findAll({
      where: {
        [Op.or]: [{organizer: req.params.id}, {guest: req.params.id}]
      },
      include: {
        model: User
      }
    })
    res.json(events)
  } catch (err) {
    next(err)
  }
})
