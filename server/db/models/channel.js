const Sequelize = require('sequelize')
const db = require('../db')
const User = require('./user')
const Channel = db.define('channel', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: Sequelize.TEXT
  },
  imageUrl: {
    type: Sequelize.STRING,
    default:
      'https://mzo5g3ubj8u20bigm1x3cth1-wpengine.netdna-ssl.com/wp-content/uploads/2017/05/Eat-this-to-build-muscle-M-610x407.jpg'
  },
  isPrivate: {
    type: Sequelize.BOOLEAN,
    default: true
  }
})

Channel.isOwner = function(userId, id) {
  return Channel.findOne({
    where: {
      userId,
      id
    },
    include: User
  })
}

module.exports = Channel
