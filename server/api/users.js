const router = require('express').Router()
const {User} = require('../db/models')
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
