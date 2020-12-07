import axios from 'axios'

const GET_EVENTS = 'GET_EVENTS'
///two find all for when user id is guest and one where they are owner

const setEvents = events => ({
  type: GET_EVENTS,
  events
})
//thunk creator
export const fetchEvents = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/events`)
      dispatch(setEvents(data))
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
    default:
      return state
  }
}
