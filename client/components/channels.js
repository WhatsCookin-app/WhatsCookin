import React from 'react'
import {connect} from 'react-redux'
import {fetchChannels} from '../store/channel.js'
import {Link} from 'react-router-dom'
import PublicChannels from './public-channels'
import PrivateChannels from './private-channels'
// import SingleChannel from './single-channel'
import RenameChannel from './edit-channel-sections/rename-channel'
import ChannelDescription from './edit-channel-sections/description-channel'
import ImageUrl from './edit-channel-sections/imageUrl-channel'
import {Modal, Button} from 'react-bootstrap'

class Channels extends React.Component {
  constructor() {
    super()
    this.state = {
      show: false
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleShow = this.handleShow.bind(this)
  }
  componentDidMount() {
    this.props.getChannels()
  }

  handleClose() {
    this.setState({show: false})
  }

  handleShow() {
    this.setState({show: true})
  }

  render() {
    const channels = this.props.channels

    if (!channels.length) return <h1>Loading</h1>

    return (
      <div id="flex">
        <h1>Browse</h1>
        <div className="all-channels">
          <PublicChannels channels={this.props.channels} />
          <PrivateChannels channels={this.props.channels} />
        </div>
        {/* <SingleChannel channels={this.props.channels} channelId={1} /> */}

        {/* This is the template for any modal form
         <Button variant="primary" onClick={this.handleShow}>
          Rename Channel
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Rename Channel</Modal.Title>
          </Modal.Header> */}

        {/* <ImageUrl handleClose={this.handleClose} />
        </Modal> */}
      </div>
    )
  }
}

const mapState = state => ({
  channels: state.channels
})

const mapDispatch = dispatch => ({
  getChannels: () => dispatch(fetchChannels())
})

export default connect(mapState, mapDispatch)(Channels)
