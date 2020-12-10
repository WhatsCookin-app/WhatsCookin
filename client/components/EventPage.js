import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux'
import {Modal, OverlayTrigger, Tooltip} from 'react-bootstrap'
import {SingleEvent} from './index'
import {fetchEvents} from '../store/events'
import {postEvent} from '../store/events.js'
import {fetchProfiles, removeUsers} from '../store/profiles'
import AddEvent from './AddEvent'
import socket from '../socket'

class EventsPage extends React.Component {
  constructor() {
    super()
    this.state = {
      move: false,
      show: false
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.getEvents(this.props.user.id)
  }

  handleClick(roomId) {
    socket.emit('create or join', roomId)
  }
  handleClose() {
    this.setState({show: false})
  }

  render() {
    const events = this.props.events
    if (!this.props.events.length) return <h1>Loading</h1>
    return (
      <div className="view">
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip name="Tool Tip">Schedule an Event</Tooltip>}
        >
          <FontAwesomeIcon
            icon={faPlus}
            onClick={() => this.setState({show: true})}
            className="cursor ml-5 mt-3 text-info"
            size="lg"
          />
        </OverlayTrigger>
        <div className="d-flex flex-wrap justify-content-center align-items-center">
          {events &&
            events.map(element => (
              <SingleEvent
                key={element.id}
                event={element}
                handleClick={this.handleClick}
              />
            ))}
        </div>

        <div>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Create a Cooking Event</Modal.Title>
            </Modal.Header>
            <AddEvent close={this.handleClose} />
          </Modal>
        </div>
      </div>
    )
  }
}
const mapState = state => ({
  events: state.events,
  user: state.user,
  profiles: state.profiles
})
const mapDispatch = dispatch => ({
  getEvents: userId => dispatch(fetchEvents(userId)),
  addEvent: (newEvent, userId) => dispatch(postEvent(newEvent, userId)),
  getProfiles: lookupValue => dispatch(fetchProfiles(lookupValue)),
  removeUsers: () => dispatch(removeUsers())
})
export default connect(mapState, mapDispatch)(EventsPage)
