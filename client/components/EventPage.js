import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux'
import {Modal, OverlayTrigger, Tooltip, Carousel, Button} from 'react-bootstrap'
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
    // this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.getEvents(this.props.user.id)
  }

  // handleClick(roomId) {
  //   socket.emit('create or join', roomId)
  // }

  handleClose() {
    this.setState({show: false})
  }

  render() {
    const events = this.props.events
    if (!this.props.events.length)
      return (
        <div className="view">
          <div className="d-flex justify-content-center">
            <Carousel className="banner mt-3">
              <Carousel.Item interval={3000}>
                <img
                  className="d-block w-100 banner filter"
                  src="/img/carousel3.jpeg"
                  alt="Rib Roast"
                />
                <Carousel.Caption>
                  <h3>Standing Rib Roast</h3>
                  <p>Made by Carmen and Marcus</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={3000}>
                <img
                  className="d-block w-100 banner filter"
                  src="/img/carousel2.jpeg"
                  alt="Candy Melt Tree"
                />

                <Carousel.Caption>
                  <h3>Candy Melt Trees</h3>
                  <p>Made by Mikyla and Maddie</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={3000}>
                <img
                  className="d-block w-100 banner filter"
                  src="/img/carousel1.jpeg"
                  alt="Birch De Noël"
                />

                <Carousel.Caption>
                  <h3>Birch De Noëll</h3>
                  <p>Made by Lidia and Kade</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
          <div className="d-flex flex-row justify-content-center mt-3">
            <h1 className="mr-3">
              GetCookin by inviting friends to a video chat virtual meet up!
            </h1>
            <div className="d-flex justify-content-end ">
              <Button
                onClick={() => this.setState({show: true})}
                className=""
                variant="primary"
              >
                Schedule an Event
              </Button>
            </div>
          </div>
          <div className="text-center mt-5">
            <p>
              You currently have no events scheduled. Click the Schedule an
              Event button to start.
            </p>
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

    return (
      <div className="view">
        <div className="d-flex justify-content-center">
          <Carousel className="banner mt-3">
            <Carousel.Item interval={3000}>
              <img
                className="d-block w-100 banner filter"
                src="/img/carousel3.jpeg"
                alt="Rib Roast"
              />
              <Carousel.Caption>
                <h3>Standing Rib Roast</h3>
                <p>Made by Carmen and Marcus</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={3000}>
              <img
                className="d-block w-100 banner filter"
                src="/img/carousel2.jpeg"
                alt="Candy Melt Tree"
              />

              <Carousel.Caption>
                <h3>Candy Melt Trees</h3>
                <p>Made by Mikyla and Maddie</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={3000}>
              <img
                className="d-block w-100 banner filter"
                src="/img/carousel1.jpeg"
                alt="Birch De Noël"
              />

              <Carousel.Caption>
                <h3>Birch De Noëll</h3>
                <p>Made by Lidia and Kade</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="d-flex m-3 justify-content-between">
          <h1>
            You have {events.length} upcoming live cooking{' '}
            {events.length === 1 ? 'event' : 'events'}:{' '}
          </h1>
          <div className="d-flex justify-content-end ">
            <Button
              onClick={() => this.setState({show: true})}
              className=""
              variant="primary"
            >
              Schedule an Event
            </Button>
          </div>
        </div>
        <div className="d-flex flex-wrap justify-content-center align-items-center">
          {events &&
            events
              .sort(function(a, b) {
                return a - b
              })
              .map(element => (
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
