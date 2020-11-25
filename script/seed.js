'use strict'

const db = require('../server/db')
const {User, Recipe} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const recipes = await Promise.all([
    Recipe.create({
      name: 'Pesto Pasta',
      ingredients: ['pesto sauce', 'pasta', 'tomatoes'],
      measurement: ['1 bottle', '1 pack', '3'],
      instructions:
        '1.Buy pesto sauce 2.Buy pasta 3.Mix sauce with pasta, 4.add tomatoes for decoration',
      imageUrl:
        'https://joyfoodsunshine.com/wp-content/uploads/2019/07/pesto-pasta-recipe-3-500x375.jpg',
      likes: 10
    }),
    Recipe.create({
      name: 'Spaghetti Meatballs',
      ingredients: ['meat balls', 'pasta', 'tomatoes sauce'],
      measurement: ['3 lbs', '1 pack', '1 bottle'],
      instructions:
        '1.Buy tomato sauce 2.Buy pasta 3.Buy meatballs 3.Mix sauce, meatballs with pasta',
      imageUrl:
        'https://feelgoodfoodie.net/wp-content/uploads/2017/03/Spaghetti-and-Meatballs-7.jpg',
      likes: 15
    })
  ])

  console.log(`seeded ${users.length} users`)
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
