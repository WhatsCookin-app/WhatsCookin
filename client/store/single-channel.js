import axios from 'axios'
import history from '../history'

const GET_SINGLE_CHANNEL = 'GET_SINGLE_CHANNEL'

const RENAME_CHANNEL = 'RENAME_CHANNEL'

const DELETE_CHANNEL = 'DELETE_CHANNEL'

const defaultChannel = {}

// action creator
const getChannel = channel => ({
  type: GET_SINGLE_CHANNEL,
  channel
})

const renameChannel = channel => ({
  type: GET_SINGLE_CHANNEL,
  channel
})

const removeChannel = channel => ({
  type: DELETE_CHANNEL,
  channel
})

//thunk creator
export const fetchChannel = channelId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/channels/${channelId}`)
      dispatch(getChannel(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const updateChannel = channel => {
  return async dispatch => {
    try {
      console.log('in update thunk', channel)
      let id = channel.id
      const {data} = await axios.put(`/api/channels/${id}`, {channel})
      dispatch(renameChannel(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteChannel = channelId => {
  return async dispatch => {
    try {
      console.log('in thunk', channelId)
      const {data} = await axios.delete(`/api/channels/${channelId}`)
      console.log(data)
      dispatch(removeChannel(data))
      history.push('/channels')
    } catch (error) {
      console.log(error)
    }
  }
}

// reducer
export default function(state = defaultChannel, action) {
  switch (action.type) {
    case GET_SINGLE_CHANNEL:
      return action.channel
    case RENAME_CHANNEL:
      return action.channel
    case DELETE_CHANNEL:
      return defaultChannel
    default:
      return state
  }
}
