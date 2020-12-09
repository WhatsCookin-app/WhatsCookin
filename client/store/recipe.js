import axios from 'axios'

// action type
const GET_RECIPES = 'GET_RECIPES'
const ADD_RECIPE = 'ADD_RECIPE'

// initial state
const defaultRecipe = []

// action creator
const getRecipes = recipes => ({
  type: GET_RECIPES,
  recipes
})

const addRecipeCreator = newRecipe => {
  return {
    type: ADD_RECIPE,
    newRecipe
  }
}

//thunk creator
export const fetchRecipes = channelId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/recipes/${channelId}`)
      dispatch(getRecipes(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//THUNK
export const postRecipe = newRecipe => {
  return async dispatch => {
    try {
      await axios.post('/api/recipes', newRecipe)
      dispatch(fetchRecipes(newRecipe.channels[0]))
    } catch (error) {
      console.log(error)
    }
  }
}

// reducer
export default function(state = defaultRecipe, action) {
  switch (action.type) {
    case GET_RECIPES:
      return action.recipes
    case ADD_RECIPE:
      return [...state, action.newRecipe]
    default:
      return state
  }
}
