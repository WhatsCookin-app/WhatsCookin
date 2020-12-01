const db = require('./db')
const {User, Events, Channel, Recipe} = require('./models')

// register models
require('./models')

module.exports = {
  db,
  User,
  Events,
  Channel,
  Recipe,
}
