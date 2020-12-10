import React, {useState} from 'react'
import {Card, Button} from 'react-bootstrap'

const SingleEvent = ({event}) => {
  const [move, setMove] = useState(false)
  return (
    <Card className="event-card m-2 border-light shadow-sm" bg="transparent">
      <Card.Img src={event.imageUrl} className="event-image rounded" />
      <Card.Body>
        <Card.Title className="text-info">
          <div className="d-flex justify-content-between align-items-center">
            <span>{event.name}</span>
            {move ? (
              <p>Video coming</p>
            ) : (
              // <VideoSession room={element.roomId} />
              <Button
                type="button"
                variant="info"
                onClick={() => setMove(true)}
              >
                Join Event
              </Button>
            )}
          </div>
        </Card.Title>
        <Card.Text>{event.description}</Card.Text>
        <Card.Text>
          <span className="font-weight-bold">When: </span>{' '}
          {new Date(event.eventDate).toLocaleDateString()} at{' '}
          {new Date(event.eventDate).toLocaleTimeString()}
        </Card.Text>
        <Card.Text>
          <span className="text-kade font-weight-bold">
            @{event.organizer.userName}{' '}
          </span>{' '}
          and{' '}
          <span className="text-kade font-weight-bold">
            @{event.guest.userName}
          </span>{' '}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default SingleEvent
