import axios from 'axios'
const GET_MY_RECIPES = 'GET_MY_RECIPES'

const getMyRecipes = recipes => ({
  type: GET_MY_RECIPES,
  recipes
})
//thunk creator
export const fetchMyRecipes = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/${userId}/recipes`)

      dispatch(getMyRecipes(data))
    } catch (error) {
      console.log(error)
    }
  }
}
const defaultRecipe = []

// reducer
export default function(state = defaultRecipe, action) {
  switch (action.type) {
    case GET_MY_RECIPES:
      return action.recipes
    default:
      return state
  }
}
