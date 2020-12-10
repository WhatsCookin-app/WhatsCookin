import axios from 'axios'
import socket from '../socket'
const GET_EVENTS = 'GET_EVENTS'
const ADD_EVENTS = 'ADD_EVENTS'

///two find all for when user id is guest and one where they are owner
const setEvents = events => ({
  type: GET_EVENTS,
  events
})

const addEvents = newEvent => ({
  type: ADD_EVENTS,
  newEvent
})
//thunk creator
export const fetchEvents = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/${userId}/events`)
      dispatch(setEvents(data))
      // socket.emit('create or join', data.roomId)
    } catch (error) {
      console.log(error)
    }
  }
}

//THUNK
export const postEvent = (newEvent, userId) => {
  return async dispatch => {
    try {
      console.log(newEvent)
      const {data} = await axios.post(`/api/users/${userId}/events`, newEvent)
      dispatch(fetchEvents(userId))
    } catch (error) {
      console.log(error)
    }
  }
}

const defaultEvents = []
// reducer
export default function(state = defaultEvents, action) {
  switch (action.type) {
    case GET_EVENTS:
      return action.events
    case ADD_EVENTS:
      return [...state, action.newEvent]
    default:
      return state
  }
}
