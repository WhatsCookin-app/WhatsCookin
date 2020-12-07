const Sequelize = require('sequelize')
const db = require('../db')

/* 
 Can you create a class method on the Events model that will get all the user's events? 
*/

const Event = db.define('event', {
  roomId: {
    type: Sequelize.UUID
  },
  name: {
    type: Sequelize.STRING
  },
  isUpcoming: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  description: {
    type: Sequelize.STRING
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
