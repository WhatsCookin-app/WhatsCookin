'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')

const {Channel} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const seedChannels = [
    {
      name: 'Breakfast',
      imageUrl:
        'https://www.jessicagavin.com/wp-content/uploads/2020/07/avocado-toast-20.jpg',
      isPrivate: false
    },
    {
      name: 'Lunch',
      imageUrl:
        'https://assets.epicurious.com/photos/5cbf6fef382892355f293611/1:1/w_1024%2Cc_limit/ginger-scallion-ramen-noodle-bowl-recipe-BA-042319.jpg',
      isPrivate: false
    },
    {
      name: 'Dinner',
      imageUrl:
        'https://www.eatwell101.com/wp-content/uploads/2019/04/chicken-and-asparagus-skillet-recipe-2.jpg',
      isPrivate: false
    },
    {
      name: 'Vegan',
      imageUrl:
        'https://images.theconversation.com/files/229615/original/file-20180727-106511-18ssguj.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip',
      isPrivate: false
    },
    {
      name: 'Vegetarian',
      imageUrl:
        'https://hips.hearstapps.com/del.h-cdn.co/assets/17/38/2048x1024/landscape-1506010503-spinach-lasagna-delish.jpg',
      isPrivate: false
    },
    {
      name: 'Gluten Free',
      imageUrl:
        'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2014/6/19/1/FN_Classic-Gluten-Free-Classic_s4x3.jpg.rend.hgtvcom.826.620.suffix/1403627915255.jpeg',
      isPrivate: false
    },
    {
      name: 'Dairy Free',
      imageUrl:
        'https://cooknourishbliss.com/wp-content/uploads/2020/07/Dairy_free_nacho_cheese.jpg',
      isPrivate: false
    },
    {
      name: 'WhatsCookin Admins',
      imageUrl:
        'https://vegansbaby.com/wp-content/uploads/2020/01/IMG_0397-1536x1152.jpg',
      isPrivate: true
    }
  ]
  const channels = await Channel.bulkCreate(seedChannels)

  console.log(`seeded ${users.length} users and ${channels.length} channels`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
