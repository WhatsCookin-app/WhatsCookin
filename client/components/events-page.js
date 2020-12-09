import React, {useEffect, useState, useRef} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux'
import {fetchEvents} from '../store/events'
import {Button} from 'react-bootstrap'
import {VideoSession} from './index'
import {v4 as uuidv4} from 'uuid'
import {moment} from 'moment'

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
    console.log('events 0: ', this.props.events[0])
    // if(this.props.events[0]){
    //   console.log('original datetime: ', new Date(this.props.events[0].eventDate))
    //   console.log('convert time: ', new Date(this.props.events[0].eventDate).toLocaleTimeString())
    //   console.log('convert date: ', new Date(this.props.events[0].eventDate).toLocaleDateString())

    // }
    const events = this.props.events
    if (!this.props.events.length) return <h1>Loading</h1>
    return (
      <div className="m-3">
        <FontAwesomeIcon icon={faPlus} />
        <div>
          {events &&
            events.map(element => {
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
  user: state.user
})
const mapDispatch = dispatch => ({
  getEvents: userId => dispatch(fetchEvents(userId))
})
export default connect(mapState, mapDispatch)(EventsPage)
