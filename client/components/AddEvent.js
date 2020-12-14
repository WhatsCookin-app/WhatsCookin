import React from 'react'
import {connect} from 'react-redux'
import {fetchEvents} from '../store/events'
import {v4 as uuidv4} from 'uuid'
import {Form, ListGroup, OverlayTrigger, Tooltip, Button} from 'react-bootstrap'
import {postEvent} from '../store/events.js'
import {fetchProfiles, removeUsers} from '../store/profiles'

class AddEvent extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      date: '',
      time: '',
      participant: '',
      selected: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.clickProfile = this.clickProfile.bind(this)
  }
  handleChange(event) {
    if (event.target.name !== 'participant') {
      this.setState({[event.target.name]: event.target.value})
    } else {
      event.target.value
        ? this.props.getProfiles(event.target.value)
        : this.props.removeUsers()
    }
  }
  clickProfile(profile) {
    console.log('clicked profile')
    console.log('profile: ', profile.userName)
    this.setState({participant: profile.userName, selected: true})
    console.log('participant: ', this.state.participant)
    this.props.removeUsers()
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
    this.props.close()
    this.props.removeUsers()
  }
  render() {
    return (
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
          <Form.Label>
            Event Description <span className="text-muted">(Optional)</span>
          </Form.Label>
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
        {!this.state.selected ? (
          <Form.Group>
            <Form.Label>Invite a User</Form.Label>
            <Form.Control
              name="participant"
              type="participant"
              value={this.state.value}
              onChange={this.handleChange}
              style={{marginLeft: '100px'}}
              placeholder="enter username here"
            />
            {/* </InputGroup> */}
          </Form.Group>
        ) : (
          <p style={{marginLeft: '15px'}}>
            Invited User:&nbsp;&nbsp;<div className="text-kade font-weight-bold">
              @{this.state.participant}
            </div>
          </p>
        )}
        {this.props.profiles.length ? (
          <ListGroup>
            {this.props.profiles.map(profile => (
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip name="Tool Tip">
                    Click to add {profile.firstName}
                  </Tooltip>
                }
                key={profile.id}
              >
                <ListGroup.Item
                  action
                  onClick={() => this.clickProfile(profile)}
                  type="submit"
                  variant="light"
                >
                  {profile.firstName} {profile.lastName} | {profile.userName}
                </ListGroup.Item>
              </OverlayTrigger>
            ))}
          </ListGroup>
        ) : (
          ''
        )}
        {this.state.name &&
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
            Create
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
            Create
          </Button>
        )}
      </Form>
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
export default connect(mapState, mapDispatch)(AddEvent)
