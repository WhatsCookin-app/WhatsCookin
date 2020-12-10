import React, {useEffect, useState, useRef} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux'
import {fetchEvents} from '../store/events'
import {
  Form,
  Modal,
  InputGroup,
  Button,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap'
import {VideoSession, SingleEvent} from './index'
import {v4 as uuidv4} from 'uuid'
import {moment} from 'moment'
import {postEvent} from '../store/events.js'
import {fetchProfiles} from '../store/profiles'

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
              <SingleEvent key={element.id} event={element} />
            ))}
        </div>
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
