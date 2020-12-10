import React, {useEffect, useState, useRef} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux'
import {fetchEvents} from '../store/events'
import {Button} from 'react-bootstrap'
import {VideoSession} from './index'
import {v4 as uuidv4} from 'uuid'
import {moment} from 'moment'
import {SingleEvent} from './index'

import {Container, Row} from 'react-bootstrap'
class EventsPage extends React.Component {
  constructor() {
    super()
    this.state = {
      move: false,
      show: false
    }
  }
  componentDidMount() {
    this.props.getEvents(this.props.user.id)
  }
  render() {
    const events = this.props.events
    if (!this.props.events.length) return <h1>Loading</h1>
    return (
      <div className="view">
        <FontAwesomeIcon icon={faPlus} />
        <div className="d-flex flex-wrap justify-content-center align-items-center">
          {events &&
            events.map(element => (
              <SingleEvent key={element.id} event={element} />
            ))}
        </div>
      </div>
    )
  }
}
const mapState = state => ({
  events: state.events,
  user: state.user
})
const mapDispatch = dispatch => ({
  getEvents: userId => dispatch(fetchEvents(userId))
})
export default connect(mapState, mapDispatch)(EventsPage)
