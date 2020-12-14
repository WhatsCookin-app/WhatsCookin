import Axios from 'axios'

const GET_EVENT = 'GET_EVENT'

const getEvent = event => ({
  type: GET_EVENT,
  event
})

export const fetchVideoEvent = roomId => {
  return async dispatch => {
    try {
      console.log('roomid: ', roomId)
      const {data} = await Axios.get(`/api/users/${roomId}/video/event`)
      dispatch(getEvent(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const defaultEvent = {}
export default function(state = defaultEvent, action) {
  switch (action.type) {
    case GET_EVENT:
      return action.event
    default:
      return state
  }
}
