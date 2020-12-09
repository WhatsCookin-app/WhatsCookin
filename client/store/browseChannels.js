import axios from 'axios'
import channel from './channel'

//action types
const GOT_BROWSE_CHANNELS = 'GOT_BROWSE_CHANNELS'
const JOINED_CHANNEL = 'JOINED_CHANNEL'

//Action creator
const gotBrowseChannels = channels => ({type: GOT_BROWSE_CHANNELS, channels})
const joinedChannel = (userId, channelId) => ({
  type: JOINED_CHANNEL,
  userId,
  channelId
})

export const getBrowseChannels = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/channels/browse')
    dispatch(gotBrowseChannels(data))
  } catch (err) {
    console.error(err)
  }
}

export const joinChannel = (userId, channelId) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/channels/join/${channelId}`)
    dispatch(joinedChannel(userId, channelId))
  } catch (err) {
    console.error(err)
  }
}

export default (state = [], action) => {
  switch (action.type) {
    case GOT_BROWSE_CHANNELS:
      return action.channels
    case JOINED_CHANNEL:
      return state.filter(channel => channel.id !== action.channelId)
    default:
      return state
  }
}
