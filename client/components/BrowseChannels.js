import React from 'react'
import {connect} from 'react-redux'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Card from 'react-bootstrap/Card'
import {getBrowseChannels} from '../store'
import {faGlobeAmericas} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'

class BrowseChannels extends React.Component {
  componentDidMount() {
    this.props.getBrowseChannels()
  }

  render() {
    const browseChannels = this.props.browseChannels
    return (
      <div id="flex">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="ml-3">Browse Channels</h1>
        </div>
        <div className="all-channels">
          {browseChannels.map(currChannel => (
            <Card className="text-white image m-2" key={currChannel.channel.id}>
              <Card.Img
                src={currChannel.channel.imageUrl}
                className="image filter rounded"
              />
              <Link to={`/home/channels/${currChannel.channelId}`}>
                <Card.ImgOverlay>
                  <Card.Title>
                    {currChannel.channel.name}{' '}
                    <FontAwesomeIcon icon={faGlobeAmericas} />
                  </Card.Title>

                  <Card.Text>{currChannel.channel.description}</Card.Text>
                </Card.ImgOverlay>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  browseChannels: state.browseChannels
})

const mapDispatch = dispatch => ({
  getBrowseChannels: () => dispatch(getBrowseChannels())
})

export default connect(mapState, mapDispatch)(BrowseChannels)
