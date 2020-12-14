import {faWrench} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import React, {useState} from 'react'
import {Card, Button, OverlayTrigger, Tooltip} from 'react-bootstrap'
import {connect} from 'react-redux'
import {UpdateEvent} from '.'
import {Link} from 'react-router-dom'

const SingleEvent = ({event, user, handleClick}) => {
  const [move, setMove] = useState(false)
  const [edit, setEdit] = useState(false)

  return (
    <Card className="event-card m-2 border-light shadow-sm" bg="transparent">
      <Card.Img src={event.imageUrl} className="event-image rounded" />
      <Card.Body>
        <Card.Title className="text-info">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <span>{event.name}</span>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip name="Tool Tip">Edit Event</Tooltip>}
              >
                <FontAwesomeIcon
                  icon={faWrench}
                  onClick={() => setEdit(true)}
                  className="cursor ml-1 text-info"
                />
              </OverlayTrigger>
            </div>
            {edit ? (
              <UpdateEvent
                event={event}
                show={edit}
                handleClose={setEdit}
                user={user}
              />
            ) : (
              ''
            )}
            <Link
              to={{
                pathname: `/home/get-cookin/${event.roomId}/${event.id}`,
                state: {name: event.name, description: event.description}
              }}
              target="_blank"
            >
              <Button
                type="button"
                variant="primary"
                // onClick={() => handleClick(event.roomId)}
              >
                Join Event
              </Button>
            </Link>
          </div>
        </Card.Title>
        <Card.Text>{event.description}</Card.Text>
        <Card.Text>
          <span className="font-weight-bold">When: </span>{' '}
          {new Date(event.eventDate).toLocaleDateString()} at{' '}
          {new Date(event.eventDate).toLocaleTimeString()}
        </Card.Text>
        <Card.Text>
          Hosted by{' '}
          <span className="text-kade font-weight-bold">
            @{event.organizer.userName}{' '}
          </span>{' '}
          with{' '}
          <span className="text-kade font-weight-bold">
            @{event.guest.userName}
          </span>{' '}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

const mapState = state => ({
  user: state.user
})
export default connect(mapState)(SingleEvent)
