import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const POST_USER = 'POST_USER'
const EDITED_USER = 'EDITED_USER'
/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const gotUserFromServer = user => ({type: POST_USER, user})
const editedUser = user => ({type: EDITED_USER, user})

// /**
//  * THUNK CREATORS
//  */

export const postUser = userObj => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/auth/signup', userObj)
      dispatch(gotUserFromServer(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = userObj => async dispatch => {
  let res
  try {
    if (userObj.method === 'signup') {
      res = await axios.post(`/auth/${userObj.method}`, {
        ...userObj
      })
    } else if (userObj.method === 'login') {
      res = await axios.post(`/auth/${userObj.method}`, {
        ...userObj
      })
    }
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }
  try {
    dispatch(getUser(res.data))
    history.push('/channels')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const editUser = body => async dispatch => {
  try {
    const {data} = await axios.put('/api/users', body)
    dispatch(editedUser(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * INITIAL STATE
 */
const defaultUser = []

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case POST_USER:
      return [...state, action.user]
    case EDITED_USER:
      return action.user
    default:
      return state
  }
}
