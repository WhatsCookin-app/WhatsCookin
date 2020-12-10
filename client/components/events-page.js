import React, {useEffect, useState, useRef} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux'
import {fetchEvents} from '../store/events'
import {Button} from 'react-bootstrap'
import {VideoSession} from './index'
import {v4 as uuidv4} from 'uuid'
import {Form, Modal, InputGroup} from 'react-bootstrap'
import {postEvent} from '../store/events.js'
import {fetchProfiles} from '../store/profiles'

import {Container, Row} from 'react-bootstrap'
class EventsPage extends React.Component {
  constructor() {
    super()
    this.state = {
      move: false,
      show: false,
      name: '',
      description: '',
      date: '',
      time: '',
      participant: ''
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getEvents(this.props.user.id)
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }
  async handleSubmit(event) {
    event.preventDefault()
    await this.props.getProfiles(this.state.participant)
    this.props.addEvent(
      {
        name: this.state.name,
        description: this.state.description,
        eventDate: this.state.date + ' ' + this.state.time + ':00',
        organizerId: this.props.user.id,
        guestId: this.props.profiles[0].id,
        roomId: uuidv4.v4()
      },
      this.props.user.id
    )
    this.handleClose()
  }
  handleClose() {
    this.setState({show: false})
  }

  render() {
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
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Event Name</Form.Label>
                <Form.Control
                  name="name"
                  type="name"
                  style={{marginLeft: '100px'}}
                  value={this.state.name}
                  onChange={this.handleChange}
                  placeholder="My Cooking Event"
                />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Event Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  name="description"
                  type="description"
                  style={{marginLeft: '100px'}}
                  value={this.state.description}
                  onChange={this.handleChange}
                  placeholder="Here is my event description"
                />
              </Form.Group>
              <Form.Group controlId="date">
                <Form.Label>Event Date</Form.Label>
                <Form.Control
                  name="date"
                  type="date"
                  value={this.state.date}
                  onChange={this.handleChange}
                  style={{marginLeft: '100px'}}
                />
              </Form.Group>
              <Form.Group controlId="time">
                <Form.Label>Event Date</Form.Label>
                <Form.Control
                  name="time"
                  type="time"
                  value={this.state.time}
                  onChange={this.handleChange}
                  style={{marginLeft: '100px'}}
                />
              </Form.Group>
              <Form.Group controlId="participant">
                <Form.Label>Invite a User</Form.Label>
                {/* <InputGroup className="mb-3"> */}
                {/* <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                </InputGroup.Prepend> */}
                <Form.Control
                  name="participant"
                  type="participant"
                  value={this.state.participant}
                  onChange={this.handleChange}
                  style={{marginLeft: '100px'}}
                  placeholder="enter username here"
                />
                {/* </InputGroup> */}
              </Form.Group>

              {this.state.name &&
              this.state.description &&
              this.state.participant &&
              this.state.date &&
              this.state.time ? (
                <Button
                  variant="success"
                  active
                  type="submit"
                  style={{
                    marginLeft: '400px',
                    marginBottom: '30px'
                  }}
                >
                  Upload
                </Button>
              ) : (
                <Button
                  variant="success"
                  disabled
                  type="submit"
                  style={{
                    marginLeft: '400px',
                    marginBottom: '30px'
                  }}
                >
                  Upload
                </Button>
              )}
            </Form>
          </Modal>
          {events &&
            events.map(element => {
              // console.log('element: ', element)
              return (
                <Container>
                  <Row className="justify-content-md-center">
                    <div key={element.id} id="single-recipe">
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
  getProfiles: lookupValue => dispatch(fetchProfiles(lookupValue))
})
export default connect(mapState, mapDispatch)(EventsPage)
