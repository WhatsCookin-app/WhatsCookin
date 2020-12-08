const router = require('express').Router()
const {User, channelUser} = require('../db/models')
const isUserMiddleware = require('./isUserMiddleware')
const Sequelize = require('sequelize')
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
    const user = await User.create(req.body)
    res.json(user)
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
