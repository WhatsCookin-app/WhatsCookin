import React from 'react'
import {connect} from 'react-redux'
import {fetchStateRecipes} from '../store/recipe.js'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {Button, Form, Modal} from 'react-bootstrap'
import {withRouter} from 'react-router'
import {Card} from 'react-bootstrap'
import {faGlobeAmericas} from '@fortawesome/free-solid-svg-icons'

class SearchChannel extends React.Component {
  render() {
    const channels = this.props.channels
    if (!channels.length) {
      return <h1>No results for your search, try a different key word</h1>
    }
    return (
      <div>
        {channels &&
          channels.map(currChannel => (
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
      </div>
    )
  }
}

const mapState = state => {
  return {
    channels: state.channels
  }
}

export default withRouter(connect(mapState)(SearchChannel))
