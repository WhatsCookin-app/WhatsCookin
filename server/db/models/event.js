const Sequelize = require('sequelize')
const db = require('../db')

const Event = db.define('event', {
  organizer: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  guest: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  eventDate: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false,
    validate: {
      isDate: true
    },
    hooks: {
      beforeCreate: function(event) {
        let currentDate = new Date()
        let date = new Date(event.eventDate)
        if (date < currentDate) {
          throw new Error('Past Event')
        }
      }
    }
  }
})

// Event.prototype.isAfter = function () {
//   const userDate = new Date(this.eventDate)
//   const today = new Date()
//   if(userDate < today) {
//     return false
//   } else {
//     return true
//   }
// }
module.exports = Event
