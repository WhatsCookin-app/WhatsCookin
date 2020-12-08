import React from 'react'
import {ListGroup, Row, OverlayTrigger, Tooltip} from 'react-bootstrap'

const UserProfiles = ({profiles, addUser, channel, removeUsers, close}) => {
  function handleClick(event, body) {
    event.preventDefault()
    addUser(body)
    removeUsers()
    close()
  }

  return (
    <ListGroup>
      {profiles.map(profile => (
        <Row key={profile.id}>
          <OverlayTrigger
            placement="right"
            overlay={
              <Tooltip name="Tool Tip">
                Click to add {profile.firstName}
              </Tooltip>
            }
          >
            <ListGroup.Item
              action
              onClick={event =>
                handleClick(event, {userId: profile.id, channelId: channel.id})
              }
              type="submit"
              variant="light"
            >
              {profile.firstName} {profile.lastName} | {profile.userName}
            </ListGroup.Item>
          </OverlayTrigger>
        </Row>
      ))}
    </ListGroup>
  )
}

export default UserProfiles
