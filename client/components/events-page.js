import React, {useEffect, useState, useRef} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux'
import {fetchEvents} from '../store/events'
import {Button} from 'react-bootstrap'
import {VideoSession} from './index'
import {v4 as uuidv4} from 'uuid'
class EventsPage extends React.Component {
  constructor() {
    super()
    this.state = {
      move: false
    }
  }
  componentDidMount() {
    this.props.getEvents()
  }
  render() {
    console.log(this.props.events)
    if (!this.props.events.id) return <h1>Loading</h1>
    return (
      <div className="view">
        <FontAwesomeIcon icon={faPlus} />
        <div>
          <p>{this.props.events.name}</p>
          <p>Room: {this.props.events.room}</p>
          <p>with {this.props.events.guestId}</p>
        </div>
        {this.state.move ? (
          <VideoSession room={this.props.events.roomId} />
        ) : (
          <Button
            type="button"
            variant="info"
            onClick={() => this.setState({move: true})}
          >
            Join Event
          </Button>
        )}
      </div>
    )
  }
}
const mapState = state => ({
  events: state.events
})
const mapDispatch = dispatch => ({
  getEvents: () => dispatch(fetchEvents())
})
export default connect(mapState, mapDispatch)(EventsPage)
