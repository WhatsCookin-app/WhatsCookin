/* global describe beforeEach it */

const {expect} = require('chai')
const {db} = require('../index.js')
const Channel = db.model('channel')
const User = db.model('user')

const seedChannels = [
  {
    name: 'Breakfast',
    imageUrl:
      'https://www.jessicagavin.com/wp-content/uploads/2020/07/avocado-toast-20.jpg',
    description:
      "The first meal taken after rising from a night's sleep, most often eaten in the early morning before undertaking the day's work.",
    isPrivate: false,
  },
  {
    name: 'Lunch',
    imageUrl:
      'https://assets.epicurious.com/photos/5cbf6fef382892355f293611/1:1/w_1024%2Cc_limit/ginger-scallion-ramen-noodle-bowl-recipe-BA-042319.jpg',
    description: 'A light midday meal between breakfast and dinner.',
    isPrivate: false,
  },
  {
    name: 'Dinner',
    imageUrl:
      'https://www.eatwell101.com/wp-content/uploads/2019/04/chicken-and-asparagus-skillet-recipe-2.jpg',
    description: 'The largest meal of the day.',
    isPrivate: false,
  },
  {
    name: 'Vegan',
    imageUrl:
      'https://images.theconversation.com/files/229615/original/file-20180727-106511-18ssguj.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip',
    description:
      "Anything that's free of animal products: No meat, fish, milk, cheese, eggs, wool, leather, honey and so forth.",
    isPrivate: false,
  },
  {
    name: 'Vegetarian',
    imageUrl:
      'https://hips.hearstapps.com/del.h-cdn.co/assets/17/38/2048x1024/landscape-1506010503-spinach-lasagna-delish.jpg',
    description:
      "You don't eat meat, poultry, or fish. You may eat eggs or dairy.",
    isPrivate: false,
  },
  {
    name: 'Gluten Free',
    imageUrl:
      'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2014/6/19/1/FN_Classic-Gluten-Free-Classic_s4x3.jpg.rend.hgtvcom.826.620.suffix/1403627915255.jpeg',
    description:
      'You must avoid wheat and some other grains while choosing substitutes that provide nutrients for a healthy diet.',
    isPrivate: false,
  },
  {
    name: 'Dairy Free',
    imageUrl:
      'https://cooknourishbliss.com/wp-content/uploads/2020/07/Dairy_free_nacho_cheese.jpg',
    description:
      'There is no dairy at all; the food is made from plants or nuts instead.',
    isPrivate: false,
  },
  {
    name: 'WhatsCookin Admins',
    imageUrl:
      'https://vegansbaby.com/wp-content/uploads/2020/01/IMG_0397-1536x1152.jpg',
    description: 'Where the true WhatsCookin bosses meet.',
    isPrivate: true,
    // ownerId: 1, throws error
  },
]

describe('Channel model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('All Channels', () => {
    let channels
    let user

    beforeEach(async () => {
      channels = await Channel.bulkCreate(seedChannels)
      user = await User.create({
        firstName: 'Cody',
        lastName: 'Hopper',
        userName: 'cody',
        email: 'cody@puppybook.com',
      })
    })

    it('returns all Channels', () => {
      expect(channels.length).to.be.equal(8)
    })

    it('can set an owner to a channel ', async () => {
      let adminChannel = await Channel.findOne({
        where: {
          name: 'WhatsCookin Admins',
        },
      })
      await adminChannel.setUser(user)
      let updatedChannel = await Channel.findOne({
        where: {
          name: 'WhatsCookin Admins',
        },
        include: User,
      })
      expect(adminChannel.userId).to.be.equal(1)
      expect(updatedChannel.dataValues.user.dataValues.firstName).to.be.equal(
        'Cody'
      )
    })
  }) // end describe('All Channels')
}) // end describe('Channel model')
