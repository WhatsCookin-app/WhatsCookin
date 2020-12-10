import React, {useState} from 'react'
import {Card, Button} from 'react-bootstrap'

const SingleEvent = ({event}) => {
  const [move, setMove] = useState(false)
  const [show, setShow] = useState(false)

  return (
    <Card className="event-card m-2 border-light shadow-sm" bg="transparent">
      <Card.Img src={event.imageUrl} className="event-image rounded" />
      {/* <Row className="justify-content-md-center"> */}
      {/* <div key={element.id} id="single-recipe"> */}
      <Card.Body>
        <Card.Title>{event.name}</Card.Title>
        <Card.Text>{event.description}</Card.Text>
        <Card.Text>
          When: {new Date(event.eventDate).toLocaleDateString()} at{' '}
          {new Date(event.eventDate).toLocaleTimeString()}
        </Card.Text>
        <Card.Text>Organizer: {event.organizer.userName}</Card.Text>
        <Card.Text> Guest: {event.guest.userName} </Card.Text>
      </Card.Body>

      {/* {this.state.move ? (
                        <VideoSession room={element.roomId} />
                      ) : (
                        <Button
                          type="button"
                          variant="info"
                          onClick={() => this.setState({move: true})}
                        >
                          Join Event
                        </Button>
                      )} */}
    </Card>
  )
}

export default SingleEvent
