const Sequelize = require('sequelize')
const db = require('../db')

const Image = db.define('image', {
  imageName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageData: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Image
