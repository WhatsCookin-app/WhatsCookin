const router = require('express').Router()

const {v4: uuidv4} = require('uuid')

router.get('/', (req, res, next) => {
  console.log('made it in')
  res.redirect(`/${uuidv4()}`)
})

router.get('/:roomId', (req, res, next) => {
  console.log('in the specific room', req.params.roomId)
  res.render('room', {roomId: req.params.roomId})
})

module.exports = router
