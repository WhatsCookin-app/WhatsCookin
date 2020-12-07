import React from 'react'
import {Link} from 'react-router-dom'
import {Card} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLock} from '@fortawesome/free-solid-svg-icons'

const PrivateChannels = ({channels}) => {
  const privateChannel = channels.filter(channel => channel.channel.isPrivate)
  return (
    <>
      {privateChannel.map(currChannel => (
        <Card className="text-white image m-2" key={currChannel.channel.id}>
          <Card.Img
            src={currChannel.channel.imageUrl}
            className="image filter rounded"
          />
          <Link to={`/home/channels/${currChannel.channelId}`}>
            <Card.ImgOverlay>
              {/* <Link to={`/home/channels/${currChannel.channelId}`}> */}
              <Card.Title>
                {currChannel.channel.name} <FontAwesomeIcon icon={faLock} />
              </Card.Title>
              {/* </Link> */}
              <Card.Text>{currChannel.channel.description}</Card.Text>
            </Card.ImgOverlay>
          </Link>
          {/* <button type="button">Edit</button> */}
        </Card>
      ))}
    </>
  )
}

export default PrivateChannels
