import axios from 'axios'

// action type
const GET_RECIPES = 'GET_RECIPES'

// initial state
const defaultRecipe = []

// action creator
const getRecipes = recipes => ({
  type: GET_RECIPES,
  recipes
})

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

// reducer
export default function(state = defaultRecipe, action) {
  switch (action.type) {
    case GET_RECIPES:
      return action.recipes
    default:
      return state
  }
}
