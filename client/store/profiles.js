import axios from 'axios'

const FIND_PROFILES = 'FIND_PROFILES'
const REMOVE_PROFILES = 'REMOVE_PROFILES'

const setUsers = profiles => ({
  type: FIND_PROFILES,
  profiles
})

export const removeUsers = () => ({
  type: REMOVE_PROFILES
})

export const fetchProfiles = lookupValue => {
  return async dispatch => {
    try {
      const {data} = await axios.get(
        `/api/users/profiles?profiles=${lookupValue}`
      )
      dispatch(setUsers(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const addProfile = body => {
  return async () => {
    try {
      await axios.post('/api/users/add', body)
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case FIND_PROFILES:
      return action.profiles
    case REMOVE_PROFILES:
      return initialState
    default:
      return state
  }
}
