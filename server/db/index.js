const db = require('./db')
const {User, Events, Channel, Recipe, ChannelRecipe} = require('./models')

// register models
require('./models')

module.exports = {
  db,
  User,
  Events,
  Channel,
  Recipe,
  ChannelRecipe
}
