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
      name: 'Thai Food Challenge',
      description: 'Cooking your favorite thai dish!',
      imageUrl:
        'https://img.theculturetrip.com/1440x807/smart/wp-content/uploads/2020/04/2ambdxg.jpg',
      eventDate: '2020-11-30 22:15:00',
      organizerId: 1,
      guestId: 2
    }),
    Event.create({
      roomId: '3caf71e2-ea2e-4325-aec6-169dc358c285',
      name: 'Pollo Guisado con Mami!',
      description: "Mom's teaching us her special sauce",
      imageUrl:
        'https://belquistwist.com/wp-content/uploads/2020/04/pollo-guisado-dominicano-stewed-chicken.jpg',
      eventDate: '2020-12-11 09:20:00',
      organizerId: 1,
      guestId: 2
    }),
    Event.create({
      roomId: '248258bc-665c-410f-b3cd-64644777e15f',
      name: 'Date Night!',
      description: 'Cook your favorite dish ',
      eventDate: '2020-12-20 13:00:00',
      imageUrl:
        'https://cook.fnr.sndimg.com/content/dam/images/cook/fullset/2012/6/14/0/CC_Ana-Sofia-Pelaez-Bacon-Wrapped-Dates-Recipe_s4x3.jpg.rend.hgtvcom.826.620.suffix/1351635644774.jpeg',
      organizerId: 2,
      guestId: 1
    }),
    Event.create({
      roomId: 'bf2e5f0d-4b4a-48f5-a481-174de0dcfaab',
      name: 'Kitchen Favorites',
      description: 'Share your favorite meal of 2020',
      imageUrl:
        'https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_677,q_85,w_1280/v1/clients/raleigh/Aviatorki_wake_county_bbq_visit_raleigh_285_d28d21ce-db65-475e-91af-b236f09fecfa.jpg',
      eventDate: '2021-01-20 17:00:00',
      organizerId: 1,
      guestId: 2
    }),
    Event.create({
      roomId: '74d86f63-285d-4646-a46e-73b5382a3bce',
      name: 'Tostones 101',
      description: 'Master the double fry technique',
      imageUrl:
        'https://belquistwist.com/wp-content/uploads/2019/08/fried-green-yellow-plantains-maduros-tostones.jpg',
      eventDate: '2021-01-21 20:30:00',
      organizerId: 2,
      guestId: 1
    }),
    Event.create({
      roomId: 'd2145fbd-f72b-4d9a-a900-82ab6deb9073',
      name: 'Jerk Sauce Challenge',
      description: 'Bring your favorite jerk seasonings!',
      imageUrl:
        'https://i8.amplience.net/i/traeger/Traeger%20Jerk%20Shrimp_RE_HE_M?w=620&sm=aspect&aspect=5:3&scaleFit=poi&$poi2$&fmt=webp',
      eventDate: '2021-01-30 16:45:00',
      organizerId: 1,
      guestId: 2
    }),
    Event.create({
      roomId: '0d5dfe20-5311-41b0-be58-0eecc2667564',
      name: 'Bake Off',
      description: 'Create your best desert',
      imageUrl:
        'https://www.macheesmo.com/wp-content/uploads/2019/11/Supernatural-Fudge-Brownies.webp',
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
    ingredients:
      '½ cup chopped onion\n2 ½ tablespoons pesto\n2 tablespoons olive oil\n2 tablespoons grated Parmesan cheese\n1 (16 ounce) package pasta\nsalt to taste\nground black pepper to taste',
    instructions:
      'Cook pasta in a large pot of boiling water until done. Drain.\nMeanwhile, heat the oil in a frying pan over medium low heat. Add pesto, onion, and salt and pepper. Cook about five minutes, or until onions are soft.\nIn a large bowl, mix pesto mixture into pasta. Stir in grated cheese. Serve.',
    imageUrl:
      'https://joyfoodsunshine.com/wp-content/uploads/2019/07/pesto-pasta-recipe-3-500x375.jpg',
    likes: 10,
    ownerId: 2
  })
  await recipes1.setChannels([3, 8])

  const recipes2 = await Recipe.create({
    name: 'Spaghetti Meatballs',
    ingredients:
      '1 ½ pounds lean ground beef\n½ cup Italian seasoned dry bread crumbs\n2 eggs\n1 (24 ounce) jar RAGÚ® Sauce, divided\n12 ounces spaghetti, cooked and drained',
    instructions:
      'Combine ground beef, bread crumbs, eggs and 1/2 cup Sauce in medium bowl; shape into 18 meatballs.\nBring remaining Sauce to a boil over medium-high heat in 12-inch skillet. Gently stir in uncooked meatballs. Reduce heat to low and simmer covered, stirring occasionally, 20 minutes or until meatballs are done.\nServe over hot spaghetti.',
    imageUrl:
      'https://feelgoodfoodie.net/wp-content/uploads/2017/03/Spaghetti-and-Meatballs-7.jpg',
    likes: 15,
    ownerId: 1
  })

  await recipes2.setChannels([3, 8])

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

  await recipes3.setChannels([1, 8, 9])

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

  await recipes4.setChannels([1, 8, 9])

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

  await recipes5.setChannels([1, 5, 8])

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

  await recipes6.setChannels([1, 8])

  const recipes7 = await Recipe.create({
    name: 'Classic Waffels',
    ingredients:
      '2 cups all-purpose flour\n1 teaspoon salt\n4 teaspoons baking powder\n2 tablespoons white sugar\n2 eggs\n1 ½ cups warm milk\n⅓ cup butter, melted\n1 teaspoon vanilla extract',
    instructions:
      'In a large bowl, mix together flour, salt, baking powder and sugar; set aside. Preheat waffle iron to desired temperature.\nIn a separate bowl, beat the eggs. Stir in the milk, butter and vanilla. Pour the milk mixture into the flour mixture; beat until blended.\nLadle the batter into a preheated waffle iron. Cook the waffles until golden and crisp. Serve immediately.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/5/5b/Waffles_with_Strawberries.jpg',
    likes: 15,
    ownerId: 1
  })

  const recipes8 = await Recipe.create({
    name: 'Strawberry Oatmeal Breakfast Smoothie',
    ingredients:
      '1 cup soy milk\n½ cup rolled oats\n1 banana, broken into chunks\n14 frozen strawberries\n½ teaspoon vanilla extract\n1 ½ teaspoons white sugar',
    instructions:
      'In a blender, combine soy milk, oats, banana and strawberries. Add vanilla and sugar if desired. Blend until smooth. Pour into glasses and serve.',
    imageUrl:
      'https://cdn.sallysbakingaddiction.com/wp-content/uploads/2013/05/Skinny-Strawberry-Banana-Milkshake-3.jpg',
    likes: 15,
    ownerId: 1
  })
  await recipes8.setChannels([1, 5, 8, 9])

  const recipes9 = await Recipe.create({
    name: 'Strawberry Crepes',
    ingredients:
      '1 cup all-purpose flour\n2 eggs\n½ cup milk\n½ cup water\n¼ teaspoon salt\n2 tablespoons butter, melted',
    instructions:
      'In a large mixing bowl, whisk together the flour and the eggs. Gradually add in the milk and water, stirring to combine. Add the salt and butter; beat until smooth.\nHeat a lightly oiled griddle or frying pan over medium high heat. Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each crepe. Tilt the pan with a circular motion so that the batter coats the surface evenly.\nCook the crepe for about 2 minutes, until the bottom is light brown. Loosen with a spatula, turn and cook the other side. Serve hot.',
    imageUrl:
      'https://tastesbetterfromscratch.com/wp-content/uploads/2014/02/Strawberries-Cream-Crepes-4.jpg',
    likes: 15,
    ownerId: 1
  })
  await recipes9.setChannels([1, 5, 8, 9])

  const recipes10 = await Recipe.create({
    name: 'Blueberry Lemon Breakfast Quinoa',
    ingredients:
      '1 cup quinoa\n2 cups nonfat milk\n1 pinch salt\n3 tablespoons maple syrup\n½ lemon, zested\n1 cup blueberries\n2 teaspoons flax seed',
    instructions:
      'Rinse quinoa in a fine strainer with cold water to remove bitterness until water runs clear and is no longer frothy.\nHeat milk in a saucepan over medium heat until warm, 2 to 3 minutes. Stir quinoa and salt into the milk; simmer over medium-low heat until much of the liquid has been absorbed, about 20 minutes. Remove saucepan from heat. Stir maple syrup and lemon zest into the quinoa mixture. Gently fold blueberries into the mixture.\nDivide quinoa mixture between 2 bowls; top each with 1 teaspoon flax seed to serve.',
    imageUrl:
      'https://driscolls.imgix.net/-/media/assets/recipes/blueberry-quinoa-breakfast-cereal.ashx',
    likes: 1,
    ownerId: 3
  })
  await recipes10.setChannels([1, 5, 8])

  const recipes11 = await Recipe.create({
    name: 'Chipotle Veggie Burritos',
    ingredients:
      '1/2 teaspoon chipotle chile powder, plus more to taste\n1 cup white rice\n1 bunch cilantro, chopped\n1 15-ounce can black bean soup (preferably spicy)\n1 clove garlic\n1 large tomato, diced\n1 10-ounce package frozen chopped spinach, thawed and squeezed dry\n2 cups frozen corn (preferably fire-roasted), thawed\nJuice of 1 lime\n4 burrito-size flour tortillas\n2 cups shredded pepper jack cheese (about 8 ounces)',
    instructions:
      'Puree all but 3 tablespoons cilantro with 2 cups water, the garlic, chile powder and 3/4 teaspoon salt in a blender until smooth. Transfer to a medium saucepan along with the rice and bring to a boil. Reduce the heat to low; cover and cook until the liquid is absorbed, about 18 minutes. Uncover, stir and let cool 5 minutes.\nMeanwhile, bring the black bean soup to a simmer in a small saucepan over medium-high heat and cook until the liquid is slightly reduced, about 3 minutes. Stir in the spinach and return to a simmer. Remove from the heat and cover to keep warm.\nToss the corn, tomato, lime juice, the reserved 3 tablespoons cilantro, 1/2 teaspoon salt, and chile powder to taste in a large bowl.\nWarm the tortillas in a dry skillet or in the microwave. Divide the rice, bean mixture and cheese among the tortillas; top with some of the corn salsa. Fold up the bottoms of the tortillas, then fold in the sides and roll up. Serve with the remaining corn salsa.',
    imageUrl:
      'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2014/6/11/1/FNM_070114-Chipotle-Veggie-Burritos-Recipe_s4x3.jpg.rend.hgtvcom.826.620.suffix/1402596449691.jpeg',
    likes: 3,
    ownerId: 3
  })
  await recipes11.setChannels([2, 5, 8])

  const recipes12 = await Recipe.create({
    name: 'Chickpea Salad Sandwiches',
    ingredients:
      'One 15-ounce can chickpeas, drained and rinsed\n3 tablespoons mayonnaise or vegan mayonnaise spread\n1 tablespoon fresh lemon juice\n1 tablespoon roughly chopped fresh dill\n2 teaspoons capers\n1 1/2 teaspoons stone-ground mustard\n1/2 teaspoon ground turmeric\nKosher salt and freshly ground black pepper\n2 tablespoons roasted unsalted pepitas\n1 cup lightly packed baby kale\n4 slices whole wheat bread, toasted',
    instructions:
      'Mash the chickpeas, mayonnaise, lemon juice, dill, capers, mustard, turmeric, 1/2 teaspoon salt and several grinds of pepper in a large bowl with a fork or potato masher until beans are crushed and mixture is slightly chunky, scrapping down the sides of the bowl with a rubber spatula as needed. Taste and adjust the seasoning with salt and pepper.\nSpread the salad onto 2 pieces of toasted whole wheat bread, top with toasted pepitas and baby kale and then sandwich with the remaining 2 pieces of bread. Serve immediately.',
    imageUrl:
      'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2020/07/13/FNK_CHICKPEA-SALAD-SANDWICHES_s4x3.jpg.rend.hgtvcom.826.620.suffix/1594676451474.jpeg',
    likes: 1,
    ownerId: 3
  })
  await recipes12.setChannels([2, 5, 8])

  const recipes13 = await Recipe.create({
    name: 'Slow-Cooker Mediterranean Lentil Soup',
    ingredients:
      'one 32-ounce boxes chicken stock (8 cups)\n1 cup diced carrots\n1 cup green lentils, rinsed\n1/2 cup jarred marinated artichokes, drained\n1/2 cup diced celery\n1/2 cup sun-dried tomatoes in oil, drained and julienned, plus 1 tablespoon oil from the jar\n1 teaspoon vegetable bouillon paste\n3 sprigs fresh oregano\n1 onion, diced\n2 cups escarole, julienned\nZest and juice of 1 lemon\nKosher salt and freshly ground black pepper\nCrusty bread, for serving',
    instructions:
      'Place the chicken stock, carrots, lentils, artichokes, celery, sun-dried tomatoes and tablespoon of their oil, bouillon paste, oregano and onion in a slower cooker. Cook until the lentils are tender, on high for 4 hours or low for 8 hours. Stir in the escarole, lemon zest and juice and let sit 5 to 10 minutes. Season with salt and pepper and serve with crusty bread alongside.',
    imageUrl:
      'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2019/2/7/0/KC2002_Quick-and-Slow-Mediterranean-Lentil-Soup_s4x3.jpg.rend.hgtvcom.826.620.suffix/1549560496815.jpeg',
    likes: 1,
    ownerId: 3
  })
  await recipes13.setChannels([2, 8])

  const recipes14 = await Recipe.create({
    name: 'Chicken Marsala',
    ingredients:
      '4 skinless, boneless, chicken breasts (about 1 1/2 pounds)\nAll-purpose flour, for dredging\nKosher salt and freshly ground black pepper\n1/4 cup extra-virgin olive oil\n4 ounces prosciutto, thinly sliced\n8 ounces crimini or porcini mushrooms, stemmed and halved\n1/2 cup sweet Marsala wine\n1/2 cup chicken stock\n2 tablespoon unsalted butter\n1/4 cup chopped flat-leaf parsley',
    instructions:
      "Put the chicken breasts side by side on a cutting board and lay a piece of plastic wrap over them; pound with a flat meat mallet, until they are about 1/4-inch thick. Put some flour in a shallow platter and season with a fair amount of salt and pepper; mix with a fork to distribute evenly.\nHeat the oil over medium-high flame in a large skillet. When the oil is nice and hot, dredge both sides of the chicken cutlets in the seasoned flour, shaking off the excess. Slip the cutlets into the pan and fry for 5 minutes on each side until golden, turning once – do this in batches if the pieces don't fit comfortably in the pan. Remove the chicken to a large platter in a single layer to keep warm.\nLower the heat to medium and add the prosciutto to the drippings in the pan, saute for 1 minute to render out some of the fat. Now, add the mushrooms and saute until they are nicely browned and their moisture has evaporated, about 5 minutes; season with salt and pepper. Pour the Marsala in the pan and boil down for a few seconds to cook out the alcohol. Add the chicken stock and simmer for a minute to reduce the sauce slightly. Stir in the butter and return the chicken to the pan; simmer gently for 1 minute to heat the chicken through. Season with salt and pepper and garnish with chopped parsley before serving.",
    imageUrl:
      'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2009/4/10/1/FO1D47_24021_s4x3.jpg.rend.hgtvcom.826.620.suffix/1431766598136.jpeg',
    likes: 1,
    ownerId: 4
  })
  await recipes14.setChannels([3, 8])

  const recipes15 = await Recipe.create({
    name: 'Speedy Teriyaki Salmon',
    ingredients:
      'Four 6-ounce skinless salmon fillets\nHalf apple, cored and thinly sliced\n2 cups teriyaki sauce\n1 tablespoon vegetable oil \n2 limes\nOne 8.5-ounce pouch microwave jasmine rice \n1/3 cup loosely packed fresh cilantro leaves',
    instructions:
      'Add the salmon to a shallow dish and pour the teriyaki sauce over the fillets. Using a pair of tongs, flip the fillets to coat them completely in the sauce.\nIn a large skillet, heat the vegetable oil over medium-high heat. Add the fillets to the skillet and cook on the first side for 5 minutes, being careful not to let them burn. Carefully flip the fillets and cook another 2 minutes on the second side. Remove to a plate and set aside.\nPour the remaining teriyaki sauce from the shallow dish into the hot skillet. Grate in the zest of 1/2 lime and allow the mixture to bubble and reduce for a few minutes. You do not want it to be super thick or sticky. Once reduced gently, nestle the salmon back into the skillet and spoon the sauce over top.\nMicrowave the pouch of rice according to the directions on the package. Pour the rice onto a serving platter.\nCarefully transfer the salmon to the bed of rice. Spoon some sauce over top of the salmon and rice. Garnish the platter with the cilantro leaves. Cut the remaining lime into wedges and arrange along the edge of the platter for serving.',
    imageUrl:
      'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2019/9/10/WU2306__Speedy-Teriyaki-Salmon_s4x3.jpg.rend.hgtvcom.826.620.suffix/1568150464164.jpeg',
    likes: 1,
    ownerId: 4
  })
  await recipes15.setChannels([3, 8])

  const recipes16 = await Recipe.create({
    name: 'Skirt Steak with Cheesy Mashed Potatoes',
    ingredients:
      '1 1/4 pounds Yukon Gold potatoes, cut into chunks\n1 pound skirt steak, cut in half\n1/2 teaspoon seasoned salt\n1 tablespoon vegetable oil\n1/2 cup 2% milk\n3 slices American cheese, torn into pieces\n2 tablespoons unsalted butter\n2 scallions, thinly sliced (light and dark green parts separated)\nSteak sauce, for serving',
    instructions:
      'Put the potatoes in a medium saucepan and add enough water to cover; season with salt. Bring to a boil, then reduce the heat to a simmer and cook until the potatoes are tender, 12 to 15 minutes. Reserve 1/2 cup cooking water, then drain the potatoes and return to the pan.\nMeanwhile, season the steak generously with pepper and the seasoned salt. Heat the vegetable oil in a large skillet over medium-high heat. Add the steak and cook until well browned, about 4 minutes per side for medium rare (reduce the heat if necessary). Transfer the steak to a cutting board. \nCombine the milk, cheese and butter in a small saucepan over medium heat. Cook, stirring, until melted and smooth. Pour into the potatoes and mash, adding some of the reserved cooking water as needed to loosen. Stir in the white and light green parts of the scallions and season with salt and pepper. Cover to keep warm.\nHeat the peas as the label directs. Slice the steak and divide among plates along with the mashed potatoes. Top the potatoes with the peas and scallion greens. Serve with steak sauce.',
    imageUrl:
      'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2019/12/24/0/FNM_010120-Skirt-Steak-with-Cheesy-Mashed-Potatoes_s4x3.jpg.rend.hgtvcom.826.620.suffix/1577211990000.jpeg',
    likes: 1,
    ownerId: 5
  })
  await recipes16.setChannels([3, 8])

  const recipes17 = await Recipe.create({
    name: 'Spaghetti alla Carbonara',
    ingredients:
      '1 pound dry spaghetti\n2 tablespoons extra-virgin olive oil\n4 ounces pancetta or slab bacon, cubed or sliced into small strips\n4 garlic cloves, finely chopped\n2 large eggs\n1 cup freshly grated Parmigiano-Reggiano, plus more for serving\n1 handful fresh flat-leaf parsley, chopped',
    instructions:
      'Prepare the sauce while the pasta is cooking to ensure that the spaghetti will be hot and ready when the sauce is finished; it is very important that the pasta is hot when adding the egg mixture, so that the heat of the pasta cooks the raw eggs in the sauce.\nBring a large pot of salted water to a boil, add the pasta and cook for 8 to 10 minutes or until tender yet firm (as they say in Italian "al dente.") Drain the pasta well, reserving 1/2 cup of the starchy cooking water to use in the sauce if you wish.\nMeanwhile, heat the olive oil in a deep skillet over medium flame. Add the pancetta and saute for about 3 minutes, until the bacon is crisp and the fat is rendered. Toss the garlic into the fat and saute for less than 1 minute to soften.\nAdd the hot, drained spaghetti to the pan and toss for 2 minutes to coat the strands in the bacon fat. Beat the eggs and Parmesan together in a mixing bowl, stirring well to prevent lumps. Remove the pan from the heat and pour the egg/cheese mixture into the pasta, whisking quickly until the eggs thicken, but do not scramble (this is done off the heat to ensure this does not happen.) Thin out the sauce with a bit of the reserved pasta water, until it reaches desired consistency. Season the carbonara with several turns of freshly ground black pepper and taste for salt. Mound the spaghetti carbonara into warm serving bowls and garnish with chopped parsley. Pass more cheese around the table.',
    imageUrl:
      'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2009/6/12/2/FO1D41_23785_s4x3.jpg.rend.hgtvcom.826.620.suffix/1431766590243.jpeg',
    likes: 1,
    ownerId: 5
  })
  await recipes17.setChannels([3, 8])

  const recipes18 = await Recipe.create({
    name: 'Classic Gluten-Free Stuffing',
    ingredients:
      '8 cups gluten-free 1-inch bread cubes (from about 2 sandwich loaves)\n2 cups turkey or chicken stock\n3 large eggs\n2 tablespoons olive oil\n1 tablespoon unsalted butter\n2 ribs celery, diced\n1 large onion, diced\n1 teaspoon finely chopped fresh rosemary\n1 teaspoon finely chopped fresh sage\n1 teaspoon finely chopped fresh thyme\nSalt and freshly ground black pepper',
    instructions:
      'Preheat the oven to 425 degrees F. Put the bread cubes in a large bowl. Heat the stock in a small pan on high heat until boiling. Reduce the heat and set to simmer on the back burner. \nBeat the eggs together in a bowl. \nSet a large saute pan on medium-high heat and warm the oil and butter. When the liquids move around the pan easily, add the celery and onion. Cook, stirring, until soft and translucent, about 7 minutes. \nAdd the rosemary, sage and thyme and cook, stirring, until they release their fragrance, about 1 minute. Add the celery mixture to the bread cubes and toss to combine. Transfer to a 3-quart casserole pan. \nPour a few tablespoons of the hot stock into the beaten eggs and quickly stir until the stock is incorporated. Slowly add the remaining stock, continuing to stir. \nPour the eggy stock over the pan of bread cubes. Press down on the cubes with your hands to distribute the liquid evenly. Cover the casserole pan with foil. \nBake the stuffing for 20 minutes. Remove the foil and cook until the stuffing is steaming hot and browned, but not dry, about 10 minutes more. A toothpick inserted in the middle should come out clean.',
    imageUrl:
      'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2014/6/19/1/FN_Classic-Gluten-Free-Classic_s4x3.jpg.rend.hgtvcom.826.620.suffix/1403627915255.jpeg',
    likes: 1,
    ownerId: 6
  })
  await recipes18.setChannels([6, 8])

  const recipes19 = await Recipe.create({
    name: 'Baked sea bass with lemon caper dressing',
    ingredients:
      '4 x 100g/4oz sea bass fillets\n6 slices sharp Cheddar, about 3 ounces\nolive oil, for brushing\n3 tbsp extra virgin olive oil\ngrated zest 1 lemon, plus 2 tbsp juice\n2 tbsp small capers\n2 tsp gluten-free Dijon mustard',
    instructions:
      "To make the dressing, mix the oil with the lemon zest and juice, capers, mustard, some seasoning and 1 tbsp water. Don't add the parsley yet (unless serving straight away) as the acid in the lemon will fade the colour if they are left together for too long.\nHeat the oven to 220C/200C fan/gas 7. Line a baking tray with baking parchment and put the fish, skin-side up, on top. Brush the skin with oil and sprinkle with some flaky salt. Bake for 7 mins or until the flesh flakes when tested with a knife. Arrange the fish on warm serving plates, spoon over the dressing and scatter with extra parsley leaves, if you like.",
    imageUrl:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/baked-sea-bass-with-lemon-caper-dressing-9a92524.jpg?quality=90&webp=true&resize=440,400',
    likes: 1,
    ownerId: 6
  })
  await recipes19.setChannels([7, 8])

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
