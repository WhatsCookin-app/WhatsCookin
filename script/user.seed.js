const {db} = require('../server/db')
const {User} = require('server/db/models/user.js')

const times = x => f => {
  if (x > 0) {
    f()
    times(x - 1)(f)
  }
}

// create 100 users
const users = []
times(5)(() =>
  user.push({
    firstName: 'Lidia',
    lastName: 'De La Cruz',
    userName: 'lidcruz',
    email: 'lidcruz@hotmail.com',
    password: 'Luna',

  })
)


module.exports = seed
