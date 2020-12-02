import React from 'react'
import {Link} from 'react-router-dom'

const PublicChannels = ({channels}) => {
  const publicChannel = channels.filter((channel) => !channel.channel.isPrivate)
  return (
    <>
      {publicChannel.map((currChannel) => (
        <div key={currChannel.channel.id}>
          <Link to={`/channels/${currChannel.channelId}`}>
            <img src={currChannel.channel.imageUrl} />
          </Link>
          <Link to={`/channels/${currChannel.channelId}`}>
            <h1>{currChannel.channel.name}</h1>
          </Link>
          <p>{currChannel.channel.description}</p>
        </div>
      ))}
    </>
  )
}

export default PublicChannels
