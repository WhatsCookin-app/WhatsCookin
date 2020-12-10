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

  const searchUsers = [
    {
      firstName: 'Michelle',
      lastName: 'Obama',
      userName: '1lady',
      email: 'becoming@hotmail.com',
      password: 'barack'
    },
    {
      firstName: 'Kade',
      lastName: 'Cahe',
      userName: 'Kadecahe',
      email: 'kadecahe@gmail.com',
      password: '1234567'
    },
    {
      firstName: 'Mikyla',
      lastName: 'Zhang',
      userName: 'mikylaz',
      email: 'mikylaz@gmail.com',
      password: '1234567'
    },
    {
      firstName: 'Lidia',
      lastName: 'De la Cruz',
      userName: 'Lidiadelacruz',
      email: 'lidiadelacruz@gmail.com',
      password: '1234567'
    },
    {
      firstName: 'Maddie',
      lastName: 'Higgens',
      userName: 'madelineurl',
      email: 'madelineurl@gmail.com',
      password: '1234567'
    },
    {
      firstName: 'Natalie',
      lastName: 'Lane',
      userName: 'nlane',
      email: 'nlane@gmail.com',
      password: '1234567'
    },
    {
      firstName: 'Ben',
      lastName: 'Rodriguez',
      userName: 'bienvenidos',
      email: 'benbucks@gmail.com',
      password: '1234567'
    }
  ]

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

  const moreUsers = await User.bulkCreate(searchUsers)

  const events = await Promise.all([
    Event.create({
      roomId: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
      name: 'first event!',
      description: 'here is the first cooking event!',
      eventDate: '2020-11-30 22:15:00',
      organizerId: 1,
      guestId: 2
    }),
    Event.create({
      roomId: '3caf71e2-ea2e-4325-aec6-169dc358c285',
      name: 'second event!',
      description: 'here is the second cooking event!',
      eventDate: '2020-12-11 09:20:00',
      organizerId: 1,
      guestId: 2
    }),
    Event.create({
      roomId: '248258bc-665c-410f-b3cd-64644777e15f',
      name: 'third event!',
      description: 'here is the third cooking event!',
      eventDate: '2020-12-20 13:00:00',
      organizerId: 2,
      guestId: 1
    }),
    Event.create({
      roomId: 'bf2e5f0d-4b4a-48f5-a481-174de0dcfaab',
      name: 'fourth event!',
      description: 'here is the fourth cooking event!',
      eventDate: '2021-01-20 17:00:00',
      organizerId: 1,
      guestId: 2
    }),
    Event.create({
      roomId: '74d86f63-285d-4646-a46e-73b5382a3bce',
      name: 'fifth event!',
      description: 'here is the fifth cooking event!',
      eventDate: '2021-01-21 20:30:00',
      organizerId: 2,
      guestId: 1
    }),
    Event.create({
      roomId: 'd2145fbd-f72b-4d9a-a900-82ab6deb9073',
      name: 'sixth event!',
      description: 'here is the sixth cooking event!',
      eventDate: '2021-01-30 16:45:00',
      organizerId: 1,
      guestId: 2
    }),
    Event.create({
      roomId: '0d5dfe20-5311-41b0-be58-0eecc2667564',
      name: 'seventh event!',
      description: 'here is the seventh cooking event!',
      eventDate: '2020-12-31 15:30:00',
      organizerId: 2,
      guestId: 1
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
      imageUrl: '/img/IMG_0397-1536x1152.jpg',
      description:
        'There is no dairy at all; the food is made from plants or nuts instead.',
      isPrivate: false
    },
    {
      name: 'WhatsCookin Admins',
      imageUrl: '/img/IMG_0397-1536x1152.jpg',
      description: 'Where the true WhatsCookin bosses meet.',
      isPrivate: true,
      userId: 1
    },
    {
      name: 'Desserts',
      imageUrl: '/img/pexels-arminas-raudys-808941.jpg',
      description: "Everyone's Guilty Pleasure",
      isPrivate: false
    },
    {
      name: 'Keto',
      imageUrl: '/img/pexels-ella-olsson-1640770.jpg',
      description:
        'Balanced diet nutrition keto concept. Assortment of healthy ketogenic low carb food ingredients for cooking on a kitchen table.',
      isPrivate: false
    },
    {
      name: 'Pescatarian',
      imageUrl: 'img/pexels-cottonbro-3298057.jpg',
      description:
        'Involves eating fish, as a main source of protein, alongside vegetables and other plant-based foods',
      isPrivate: false
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
    ingredients: 'pesto sauce - 1 bottle\npasta - 1 pack\ntomatoes - 3',
    instructions:
      'Buy pesto sauce\nBuy pasta\nMix sauce with pasta,\nadd tomatoes for decoration',
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
      'Buy tomato sauce\nBuy pasta\nBuy meatballs\nMix sauce, meatballs with pasta',
    imageUrl:
      'https://feelgoodfoodie.net/wp-content/uploads/2017/03/Spaghetti-and-Meatballs-7.jpg',
    likes: 15,
    ownerId: 1
  })

  await recipes2.setChannels([1, 2, 3, 4])

  const recipes3 = await Recipe.create({
    name: 'Easy Pancake',
    ingredients:
      '3 ½ teaspoons baking powder\n1 ½ cups all-purpose flour\n1 tablespoon white sugar\n1 ¼ cups milk\n1 egg\n3 tablespoons butter, melted',
    instructions:
      'In a large bowl, sift together the flour, baking powder, salt and sugar. Make a well in the center and pour in the milk, egg and melted butter; mix until smooth.\nHeat a lightly oiled griddle or frying pan over medium-high heat. Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each pancake. Brown on both sides and serve hot.',
    imageUrl:
      'https://www.rachaelrayshow.com/sites/default/files/styles/video_1920x1080/public/images/2020-08/pancakes.jpg?itok=_b20Usqy',
    likes: 15,
    ownerId: 2
  })

  await recipes3.setChannels([1, 2, 3, 4])

  const recipes4 = await Recipe.create({
    name: 'French Toast',
    ingredients:
      '1 teaspoon ground cinnamon\n1/4 teaspoon ground nutmeg\n2 tablespoons sugar\n4 tablespoons butter\n1/4 cup milk\n8 slices challah, brioche, or white bread\n1/2 teaspoon vanilla extract\n1/2 cup maple syrup, warmed',
    instructions:
      'In a small bowl, combine cinnamon, nutmeg, and sugar and set aside briefly.\nIn a 10-inch or 12-inch skillet, melt butter over medium heat. Whisk together cinnamon mixture, eggs, milk, and vanilla and pour into a shallow container such as a pie plate. Dip bread in egg mixture. Fry slices until golden brown, then flip to cook the other side. Serve with syrup.',
    imageUrl:
      'https://d1e3z2jco40k3v.cloudfront.net/-/media/mccormick-us/recipes/mccormick/q/800/quick_and_easy_french_toast_new_800x800.jpg',
    likes: 20,
    ownerId: 2
  })

  await recipes4.setChannels([1, 2, 3, 4])

  const recipes5 = await Recipe.create({
    name: 'Avocado Toast',
    ingredients:
      '1 avocado peeled and seeded\n2 tablespoons chopped cilantro\njuice of 1/2 lime\n2 slices whole grain bread or bread of choice\n2 eggs fried, scrambled, or poached, optional',
    instructions:
      'Toast 2 slices of whole grain in a toaster until golden and crispy.\nIn a small bowl combine and mash the avocado, cilantro, lime, and salt + pepper to taste. Spread half of the mixture on each slice of toasted bread. Top with fried, scrambled, or poached egg if desired.',
    imageUrl:
      'https://www.thekitchenwhisperer.net/wp-content/uploads/2020/03/Caprese-Avocado-Toast-7.jpg',
    likes: 5,
    ownerId: 2
  })

  await recipes5.setChannels([1, 2, 3, 4])

  const recipes6 = await Recipe.create({
    name: 'Smoked Salmon Bagel',
    ingredients:
      '1 pumpernickel or plain bagel (6 oz.)\n2 tablespoons chive cream cheese\n⅓ cup thinly sliced English cucumber\n3 ounces thin-sliced smoked salmon\n3 thin rings red onion\n½ teaspoon drained capers',
    instructions:
      'Split bagel in half horizontally. Spread cut sides with cream cheese. Over cheese on 1 bagel half, layer cucumber, smoked salmon, red onion, and capers. Set remaining bagel half, cream cheese side down, over filling.',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJocc8XdPQAafaheeo_s60M85QUHWn8imtYA&usqp=CAU',
    likes: 15,
    ownerId: 2
  })

  await recipes6.setChannels([1, 2, 3, 4])

  console.log(
    `seeded ${users.length + moreUsers.length} users, ${
      channels.length
    } channels, ${newChannelUsers.length} users channels, 6 recipes, and ${
      events.length
    } events.`
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
