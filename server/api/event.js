const router = require('express').Router()
const {Event} = require('../db/models')
module.exports = router
///two find all for when user id is guest and one where they are owner
//For the future
router.get('/', async (req, res, next) => {
  try {
    // const user = req.user.id
    const event = await Event.findOne({
      where: {
        organizerId: 1
      }
    })
    res.json(event)
  } catch (err) {
    next(err)
  }
})
