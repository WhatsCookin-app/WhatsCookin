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
      'https://i2.wp.com/www.eatthis.com/wp-content/uploads/2019/10/mixed-greens-salad-pears-pumpkin.jpg?resize=1250%2C702&ssl=1'
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
