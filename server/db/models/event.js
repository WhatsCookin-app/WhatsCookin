const Sequelize = require('sequelize')
const db = require('../db')

const Event = db.define('event', {
  participantIdOne: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  participantIdTwo:{
    type: Sequelize.TEXT,
    allowNull: false
  },
  eventDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
})

module.exports = Event
