const User = require('./user')
const Recipe = require('./recipe')
const Event = require('./event')
const Channel = require('./channel')
const channelUser = require('./channelUser')
const Image = require('./image')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

// Event.belongsToMany(User, {as: 'Guest'})
// User.belongsToMany(Event, {as: 'Organizer'})
//Mikyla suggestion below
//Might also want to define as a string the through table for lines 22 and 26/23 so that both associations belong to the same table
// Event.belongsToMany(User, {as: 'Organizer', through: 'EventParticipants'}) //example

Event.belongsTo(User, {as: 'organizer'})
Event.belongsTo(User, {as: 'guest'})

// User.hasMany(Recipe)
Recipe.belongsTo(User, {as: 'owner'})
Recipe.belongsToMany(Channel, {
  through: 'channelRecipe'
})
Channel.belongsToMany(Recipe, {
  through: 'channelRecipe'
})
// Channel.belongsTo(User, {as: 'owner'})
Channel.belongsTo(User)
User.belongsToMany(Channel, {through: channelUser})
Channel.belongsToMany(User, {through: channelUser})
channelUser.belongsTo(Channel)

module.exports = {
  User,
  Recipe,
  Channel,
  Event,
  channelUser,
  Image
}
