import React from 'react'
import {connect} from 'react-redux'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Card from 'react-bootstrap/Card'
import {getBrowseChannels, joinChannel} from '../store'
import {faGlobeAmericas, faPlus} from '@fortawesome/free-solid-svg-icons'
import {withRouter} from 'react-router-dom'

class BrowseChannels extends React.Component {
  componentDidMount() {
    this.props.getBrowseChannels()
  }

  render() {
    const browseChannels = this.props.browseChannels
    return (
      <div id="flex" className="view">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="ml-3">Browse Channels</h1>
        </div>
        <div className="all-channels">
          {browseChannels.map(currChannel => (
            <Card className="text-white image m-2" key={currChannel.id}>
              <Card.Img
                src={currChannel.imageUrl}
                className="image filter rounded"
              />
              <div
                onClick={evt => {
                  if (evt.target.tagName.toLowerCase() !== 'path')
                    this.props.history.push(`/home/channels/${currChannel.id}`)
                }}
              >
                <Card.ImgOverlay
                  style={{display: 'flex', justifyContent: 'space-between'}}
                >
                  <div>
                    <Card.Title>
                      {currChannel.name}{' '}
                      <FontAwesomeIcon icon={faGlobeAmericas} />
                    </Card.Title>

                    <Card.Text>{currChannel.description}</Card.Text>
                  </div>
                  <FontAwesomeIcon
                    name="join"
                    icon={faPlus}
                    size="lg"
                    style={{color: '#FFFFFF'}}
                    onClick={() => {
                      this.props.joinChannel(this.props.user.id, currChannel.id)
                    }}
                  />
                </Card.ImgOverlay>
              </div>
            </Card>
          ))}
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  browseChannels: state.browseChannels,
  user: state.user
})

const mapDispatch = dispatch => ({
  getBrowseChannels: () => dispatch(getBrowseChannels()),
  joinChannel: (userId, channelId) => dispatch(joinChannel(userId, channelId))
})

export default withRouter(connect(mapState, mapDispatch)(BrowseChannels))
