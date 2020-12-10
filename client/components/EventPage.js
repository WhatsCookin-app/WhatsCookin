import React, {useEffect, useState, useRef} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux'
import {fetchEvents} from '../store/events'
import {Button} from 'react-bootstrap'
import {VideoSession} from './index'
import {Modal} from 'react-bootstrap'
import {postEvent} from '../store/events.js'
import {fetchProfiles, removeUsers} from '../store/profiles'
import AddEvent from './AddEvent'

import {Container, Row} from 'react-bootstrap'
class EventsPage extends React.Component {
  constructor() {
    super()
    this.state = {
      move: false,
      show: false
    }
    this.handleClose = this.handleClose.bind(this)
  }

  componentDidMount() {
    this.props.getEvents(this.props.user.id)
  }

  handleClose() {
    this.setState({show: false})
  }

  render() {
    console.log('render participant: ', this.state.participant)
    // console.log('date: ', this.state.date)
    // console.log('time: ', this.state.time)
    // console.log('datetime: ',this.state.date+' '+this.state.time+':00')
    // console.log('v4: ', uuidv4.v4())
    const events = this.props.events
    if (!this.props.events.length) return <h1>Loading</h1>
    return (
      <div className="view">
        <FontAwesomeIcon
          icon={faPlus}
          onClick={() => this.setState({show: true})}
        />
        <div>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Create a Cooking Event</Modal.Title>
            </Modal.Header>
            <AddEvent close={this.handleClose} />
          </Modal>
          {events &&
            events.map(element => {
              return (
                <Container key={element.id}>
                  <Row className="justify-content-md-center">
                    <div id="single-recipe">
                      <p> Event Name: {element.name}</p>
                      <p> Description: {element.description}</p>
                      <p>
                        {' '}
                        Scheduled Date:{' '}
                        {new Date(element.eventDate).toLocaleDateString()}
                      </p>
                      <p>
                        {' '}
                        Scheduled Time:{' '}
                        {new Date(element.eventDate).toLocaleTimeString()}
                      </p>
                      <p> Organizer: {element.organizer.userName}</p>
                      <p> Guest: {element.guest.userName} </p>
                      {this.state.move ? (
                        <VideoSession room={element.roomId} />
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
                  </Row>
                </Container>
              )
            })}
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
