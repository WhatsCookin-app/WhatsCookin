import axios from 'axios'

//action types
const GOT_BROWSE_CHANNELS = 'GOT_BROWSE_CHANNELS'

//Action creator
const gotBrowseChannels = channels => ({type: GOT_BROWSE_CHANNELS, channels})

export const getBrowseChannels = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/channels/browse')
    dispatch(gotBrowseChannels(data))
  } catch (err) {
    console.error(err)
  }
}

export default (state = [], action) => {
  switch (action.type) {
    case GOT_BROWSE_CHANNELS:
      return action.channels
    default:
      return state
  }
}
