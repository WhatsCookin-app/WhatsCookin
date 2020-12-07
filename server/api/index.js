const router = require('express').Router()
module.exports = router

router.use('/events', require('./event'))
router.use('/users', require('./users'))
router.use('/recipes', require('./recipes'))
router.use('/channels', require('./channels'))
router.use('/image', require('./image')) //IMAGE

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router
