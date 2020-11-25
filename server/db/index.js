const db = require('./db')
const User = require('server/db/models/user.js')
const Events = require('server/db/models/event.js')

// register models
require('./models')

module.exports = {
  db,
  User,
  Events,
}
