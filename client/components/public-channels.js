import React from 'react'
import {Link} from 'react-router-dom'
import {Card} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGlobeAmericas} from '@fortawesome/free-solid-svg-icons'

const PublicChannels = ({channels}) => {
  const publicChannel = channels.filter(channel => !channel.channel.isPrivate)
  return (
    <>
      {publicChannel.map(currChannel => (
        <Card className="text-white image m-2" key={currChannel.channel.id}>
          <Card.Img
            src={currChannel.channel.imageUrl}
            className="image filter rounded"
          />
          <Link to={`/home/channels/${currChannel.channelId}`}>
            <Card.ImgOverlay>
              {/* <Link to={`/home/channels/${currChannel.channelId}`}> */}
              <Card.Title>
                {currChannel.channel.name}{' '}
                <FontAwesomeIcon icon={faGlobeAmericas} />
              </Card.Title>
              {/* </Link> */}
              <Card.Text>{currChannel.channel.description}</Card.Text>
              {/* <Link> */}
            </Card.ImgOverlay>
          </Link>
          {/* <button type="button">Edit</button> */}
          {/* </Link> */}
        </Card>
      ))}
    </>
  )
}

export default PublicChannels
