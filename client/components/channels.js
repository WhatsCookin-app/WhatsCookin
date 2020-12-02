import React from 'react'
import {connect} from 'react-redux'
import {fetchChannels} from '../store/channel.js'
import {Link} from 'react-router-dom'
import PublicChannels from './public-channels'
import PrivateChannels from './private-channels'

class Channels extends React.Component {
  componentDidMount() {
    this.props.getChannels()
  }

  render() {
    const channels = this.props.channels

    if (!channels.length) return <h1>Loading</h1>

    return (
      <>
        <PublicChannels channels={this.props.channels} />
        <PrivateChannels channels={this.props.channels} />
      </>
    )
  }
}

const mapState = (state) => ({
  channels: state.channels,
})

const mapDispatch = (dispatch) => ({
  getChannels: () => dispatch(fetchChannels()),
})

export default connect(mapState, mapDispatch)(Channels)
