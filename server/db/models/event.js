const Sequelize = require('sequelize')
const db = require('../db')

const Event = db.define('event', {
  roomId: {
    type: Sequelize.UUID
  },
  name: {
    type: Sequelize.STRING
  },
  // isUpcoming: {
  //   type: Sequelize.BOOLEAN,
  //   defaultValue: true
  // },
  description: {
    type: Sequelize.STRING
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://media1.s-nbcnews.com/j/newscms/2019_50/3146046/191212-stock-kitchen-cooking-wok-ew-228p_02b448af054ee73a0103f9b0353a525f.fit-2000w.jpg'
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
  //   eventDate: {
  //     type: Sequelize.STRING,
  //     allowNull: false
  //   },
  //   eventTime: {
  //     type: Sequelize.STRING,
  //     allowNull: false
  //   },
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
