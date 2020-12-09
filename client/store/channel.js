import axios from 'axios'

// action type
const GET_CHANNELS = 'GET_CHANNELS'
const GET_RESULTS_CHANNEL = 'GET_RESULTS_CHANNEL'

// initial state
const defaultChannels = []

// action creator
const getChannels = channels => ({
  type: GET_CHANNELS,
  channels
})

// action creator
const getResultsChannel = channels => ({
  type: GET_RESULTS_CHANNEL,
  channels
})

//thunk creator
export const fetchChannels = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/channels`)
      dispatch(getChannels(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//thunk creator
export const fetchChannelResults = searchStr => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/channels/search?c=${searchStr}`)
      dispatch(getResultsChannel(data))
    } catch (error) {
      console.log(error)
    }
  }
}

// reducer
export default function(state = defaultChannels, action) {
  switch (action.type) {
    case GET_CHANNELS:
      return action.channels
    case GET_RESULTS_CHANNEL:
      return action.channels
    default:
      return state
  }
}
