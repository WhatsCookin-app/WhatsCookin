import axios from 'axios'
import recipe from './recipe'
import history from '../history'

// action type
const GET_ONE_RECIPE = 'GET_ONE_RECIPE'

// initial state
const defaultRecipe = {recipe: {}, loading: true}

// action creator

const getOneRecipe = recipe => ({
  type: GET_ONE_RECIPE,
  recipe
})

const UPDATE_SINGLE_RECIPE = 'UPDATE_SINGLE_RECIPE'
const updateSingleRecipeCreator = recipe => {
  return {
    type: UPDATE_SINGLE_RECIPE,
    recipe
  }
}

const DELETE_RECIPE = 'DELETE_RECIPE'
const deleteRecipeCreator = () => {
  return {
    type: DELETE_RECIPE
  }
}

//thunk creator

export const fetchOneRecipe = recipeId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/recipes/${recipeId}`)
      dispatch(getOneRecipe(data))
    } catch (err) {
      console.log(err)
    }
  }
}

const SET_LOADING = 'SET_LOADING'
const loadingCreator = () => {
  return {
    type: SET_LOADING
  }
}
export const loadingRecipe = () => {
  return async dispatch => {
    try {
      const action = loadingCreator()
      dispatch(action)
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const updateSingleRecipe = (recipeId, recipe) => {
  return async dispatch => {
    try {
      const response = await axios.put(`/api/recipes/${recipeId}`, recipe)
      const action = updateSingleRecipeCreator(response.data)
      dispatch(action)
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const deleteRecipe = (recipeId, source, channelId) => {
  return async dispatch => {
    try {
      await axios.delete(`/api/recipes/${recipeId}`)
      const action = deleteRecipeCreator()
      dispatch(action)
      if (source === 'channels') {
        history.push(`/home/channels/${channelId}`)
      }
      if (source === 'search') {
        console.log('pushing back to search result!')
        history.push('/recipes/searchResult')
      }
      if (source === 'myRecipes') {
        history.push('/home/myRecipes')
      }
    } catch (err) {
      console.error(err.message)
    }
  }
}

// reducer
export default function(state = defaultRecipe, action) {
  switch (action.type) {
    case GET_ONE_RECIPE:
      return {recipe: action.recipe, loading: false}
    case UPDATE_SINGLE_RECIPE:
      return {recipe: action.recipe, loading: false}
    case SET_LOADING:
      return {recipe: {...state.recipe}, loading: true}
    case DELETE_RECIPE:
      return defaultRecipe
    default:
      return state
  }
}
