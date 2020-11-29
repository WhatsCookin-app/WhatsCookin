const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/channels', require('./channels'))
router.use('/recipe', require('./recipe'))
router.use('/event', require('./event'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})


module.exports = router
