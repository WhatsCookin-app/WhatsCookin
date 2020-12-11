import React from 'react'
import {connect} from 'react-redux'
import {fetchChannels} from '../store/channel.js'
import PublicChannels from './public-channels'
import PrivateChannels from './private-channels'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faSearch} from '@fortawesome/free-solid-svg-icons'
import {OverlayTrigger, Tooltip, ListGroup, Modal, Image} from 'react-bootstrap'
import {AddChannel} from './edit-channel-sections/index.js'
import {Link} from 'react-router-dom'
import {me} from '../store/user'

class Channels extends React.Component {
  constructor() {
    super()
    this.state = {
      show: false,
      showAddOptions: false
    }
  }

  componentDidMount() {
    this.props.getChannels()
    this.props.me()
  }

  render() {
    const channels = this.props.channels
    const bool = this.state.showAddOptions

    //if (!channels.length) return <h1>Loading</h1>

    return (
      <div id="flex view">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex flex-row align-items-center">
            <Image
              src={this.props.user.profilePicture}
              className="profilepic ml-3"
              roundedCircle
            />
            <span>
              <h1 className="ml-3">{this.props.user.userName}'s Channels</h1>
            </span>
          </div>
          <div>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip name="Tool Tip">Add a Channel</Tooltip>}
            >
              <FontAwesomeIcon
                icon={faPlus}
                className="mr-3 text-info cursor"
                size="lg"
                onClick={() => {
                  this.setState({showAddOptions: !bool})
                }}
              />
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip name="Tool Tip">Browse Channels</Tooltip>}
            >
              <Link to="/browse">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="mr-3 text-info cursor"
                  size="lg"
                />
              </Link>
            </OverlayTrigger>
          </div>
        </div>
        <div className="all-channels">
          <PrivateChannels channels={channels} />
          <PublicChannels channels={channels} />
        </div>
        {this.state.showAddOptions ? (
          <Modal
            show={this.state.showAddOptions}
            onHide={() => this.setState({showAddOptions: !bool})}
          >
            <Modal.Header closeButton>
              <Modal.Title>Create a Channel</Modal.Title>
            </Modal.Header>
            <AddChannel close={() => this.setState({showAddOptions: !bool})} />
          </Modal>
        ) : (
          ''
        )}
      </div>
    )
  }
}
//
const mapState = state => ({
  channels: state.channels,
  user: state.user
})

const mapDispatch = dispatch => ({
  getChannels: () => dispatch(fetchChannels()),
  me: () => dispatch(me())
})

export default connect(mapState, mapDispatch)(Channels)
