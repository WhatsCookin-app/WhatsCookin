const Sequelize = require('sequelize')
const db = require('../db')

const channelUser = db.define(
  'channelUser',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  },
  {timestamp: false}
)

module.exports = channelUser
