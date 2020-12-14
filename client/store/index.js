import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import recipe from './recipe'
import singleRecipe from './singleRecipe'
import channels from './channel'
import singleChannel from './single-channel'
import events from './events'
import videos from './videos'
import profiles from './profiles'
import browseChannels from './browseChannels'
import searchStr from './searchStr'
import myRecipes from './myRecipe'

const reducer = combineReducers({
  user,
  recipe,
  channels,
  singleChannel,
  singleRecipe,
  events,
  videos,
  profiles,
  browseChannels,
  searchStr,
  myRecipes
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './browseChannels'
