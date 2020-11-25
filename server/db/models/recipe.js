const Sequelize = require('sequelize')
const db = require('../db')

const Recipe = db.define('recipe', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  ingredients: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },

  measurement: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },

  instructions: {
    type: Sequelize.TEXT
  },

  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=960,872'
  },

  likes: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  }
})

module.exports = Recipe
