import React from 'react'
import {Link} from 'react-router-dom'
import {Card} from 'react-bootstrap'

const PrivateChannels = ({channels}) => {
  const privateChannel = channels.filter(channel => channel.channel.isPrivate)
  return (
    <>
      {privateChannel.map(currChannel => (
        <Card
          className="bg-dark text-white image m-2"
          key={currChannel.channel.id}
        >
          <Link to={`/home/channels/${currChannel.channelId}`}>
            <Card.Img
              src={currChannel.channel.imageUrl}
              className="image filter"
              rounded
            />
          </Link>
          <Card.ImgOverlay>
            <Link to={`/home/channels/${currChannel.channelId}`}>
              <Card.Title>{currChannel.channel.name}</Card.Title>
            </Link>
            <Card.Text>{currChannel.channel.description}</Card.Text>
          </Card.ImgOverlay>
          {/* <button type="button">Edit</button> */}
        </Card>
      ))}
    </>
  )
}

export default PrivateChannels
