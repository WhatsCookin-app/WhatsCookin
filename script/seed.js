'use strict'

const {db} = require('../server/db')
const {
  User,
  Recipe,
  Channel,
  channelUser,
  Event
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Barack',
      lastName: 'Obama',
      userName: '1president',
      email: 'bobama@hotmail.com',
      password: 'michelle'
    }),
    User.create({
      firstName: 'Cody',
      lastName: 'Hopper',
      userName: 'cody',
      email: 'cody@hotmail.com',
      password: 'ilovegh'
    })
  ])

  const events = await Promise.all([
    Event.create({
      organizer: '1',
      guest: '2',
      eventDate: 2020 - 11 - 30
    })
  ])

  const seedChannels = [
    {
      name: 'Breakfast',
      imageUrl:
        'https://www.jessicagavin.com/wp-content/uploads/2020/07/avocado-toast-20.jpg',
      description:
        "The first meal taken after rising from a night's sleep, most often eaten in the early morning before undertaking the day's work.",
      isPrivate: false
    },
    {
      name: 'Lunch',
      imageUrl:
        'https://assets.epicurious.com/photos/5cbf6fef382892355f293611/1:1/w_1024%2Cc_limit/ginger-scallion-ramen-noodle-bowl-recipe-BA-042319.jpg',
      description: 'A light midday meal between breakfast and dinner.',
      isPrivate: false
    },
    {
      name: 'Dinner',
      imageUrl:
        'https://www.eatwell101.com/wp-content/uploads/2019/04/chicken-and-asparagus-skillet-recipe-2.jpg',
      description: 'The largest meal of the day.',
      isPrivate: false
    },
    {
      name: 'Vegan',
      imageUrl:
        'https://images.theconversation.com/files/229615/original/file-20180727-106511-18ssguj.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip',
      description:
        "Anything that's free of animal products: No meat, fish, milk, cheese, eggs, wool, leather, honey and so forth.",
      isPrivate: false
    },
    {
      name: 'Vegetarian',
      imageUrl:
        'https://hips.hearstapps.com/del.h-cdn.co/assets/17/38/2048x1024/landscape-1506010503-spinach-lasagna-delish.jpg',
      description:
        "You don't eat meat, poultry, or fish. You may eat eggs or dairy.",
      isPrivate: false
    },
    {
      name: 'Gluten Free',
      imageUrl:
        'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2014/6/19/1/FN_Classic-Gluten-Free-Classic_s4x3.jpg.rend.hgtvcom.826.620.suffix/1403627915255.jpeg',
      description:
        'You must avoid wheat and some other grains while choosing substitutes that provide nutrients for a healthy diet.',
      isPrivate: false
    },
    {
      name: 'Dairy Free',
      imageUrl:
        'https://cooknourishbliss.com/wp-content/uploads/2020/07/Dairy_free_nacho_cheese.jpg',
      description:
        'There is no dairy at all; the food is made from plants or nuts instead.',
      isPrivate: false
    },
    {
      name: 'WhatsCookin Admins',
      imageUrl:
        'https://vegansbaby.com/wp-content/uploads/2020/01/IMG_0397-1536x1152.jpg',
      description: 'Where the true WhatsCookin bosses meet.',
      isPrivate: true,
      userId: 1
    }
  ]

  const channels = await Channel.bulkCreate(seedChannels)

  const seedChannelUsers = [
    {
      userId: 1,
      channelId: 1
    },
    {
      userId: 2,
      channelId: 1
    },
    {
      userId: 1,
      channelId: 2
    },
    {
      userId: 2,
      channelId: 2
    },
    {
      userId: 1,
      channelId: 3
    },
    {
      userId: 2,
      channelId: 4
    },
    {
      userId: 1,
      channelId: 5
    },
    {
      userId: 2,
      channelId: 6
    },
    {
      userId: 1,
      channelId: 7
    },
    {
      userId: 2,
      channelId: 8
    },
    {
      userId: 1,
      channelId: 8
    }
  ]

  const newChannelUsers = await channelUser.bulkCreate(seedChannelUsers)

  const recipes1 = await Recipe.create({
    name: 'Pesto Pasta',
    ingredients: 'pesto sauce - 1 bottle \npasta - 1 pack \ntomatoes - 3',
    instructions:
      '1.Buy pesto sauce 2.Buy pasta 3.Mix sauce with pasta, 4.add tomatoes for decoration',
    imageUrl:
      'https://joyfoodsunshine.com/wp-content/uploads/2019/07/pesto-pasta-recipe-3-500x375.jpg',
    likes: 10,
    ownerId: 2
  })
  await recipes1.setChannels([1, 4])

  const recipes2 = await Recipe.create({
    name: 'Spaghetti Meatballs',
    ingredients: 'meat balls - 3 lbs\npasta - 1 pack\ntomatoe sauce - 1 bottle',
    instructions:
      '1.Buy tomato sauce 2.Buy pasta 3.Buy meatballs 3.Mix sauce, meatballs with pasta',
    imageUrl:
      'https://feelgoodfoodie.net/wp-content/uploads/2017/03/Spaghetti-and-Meatballs-7.jpg',
    likes: 15,
    ownerId: 1
  })

  await recipes2.setChannels([3, 4])

  console.log(
    `seeded ${users.length} users, ${channels.length} channels, and ${
      newChannelUsers.length
    } channel users`
  )

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
