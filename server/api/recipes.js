const router = require('express').Router()
const {Recipe, Channel} = require('../db/models')
module.exports = router

// get all recipes of a channel
router.get('/:channelId', async (req, res, next) => {
  try {
    const recipes = await Recipe.findAll({
      include: [
        {
          model: Channel,
          where: {
            id: req.params.channelId
          }
        }
      ]
    })
    console.log(recipes)
    res.json(recipes)
  } catch (err) {
    next(err)
  }
})

// get a single recipe
router.get('/:channelId/:recipeId', async (req, res, next) => {
  try {
    const recipes = await Recipe.findAll({
      where: {
        id: req.params.recipeId
      }
    })
    console.log(recipes)
    res.json(recipes)
  } catch (err) {
    next(err)
  }
})

// create a recipe (channel ids will be an array in req.body)
router.post('/', async (req, res, next) => {
  try {
    const {name, ingredients, instructions, channels} = req.body
    const newRecipe = await Recipe.create({
      name,
      ingredients,
      instructions,
      ownerId: req.user.id
    })
    await newRecipe.addChannels(channels)
    res.json(newRecipe)
  } catch (err) {
    next(err)
  }
})

// edit a recipe
router.put('/:recipeId', async (req, res, next) => {
  try {
    const recipe = await Recipe.findByPk(req.params.recipeId)
    if (Number(recipe.dataValues.ownerId) === Number(req.user.id)) {
      await recipe.update(req.body)
      const updated = Recipe.findByPk(req.params.recipeId)
      res.json(recipe)
    } else {
      const err = new Error('Only recipe owner can edit this recipe')
      err.status = 401
      return next(err)
    }
  } catch (err) {
    next(err)
  }
})

// delete a recipe
router.delete('/:recipeId', async (req, res, next) => {
  try {
    const recipe = await Recipe.findByPk(req.params.recipeId)
    if (Number(recipe.dataValues.ownerId) === Number(req.user.id)) {
      await recipe.destroy()
      res.json('recipe deleted')
    } else {
      const err = new Error('Only recipe owner can delete this recipe')
      err.status = 401
      return next(err)
    }
  } catch (err) {
    next(err)
  }
})
