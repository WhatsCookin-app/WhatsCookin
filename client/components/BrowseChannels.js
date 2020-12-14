import React from 'react'
import {connect} from 'react-redux'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Card from 'react-bootstrap/Card'
import {getBrowseChannels, joinChannel} from '../store'
import {faGlobeAmericas} from '@fortawesome/free-solid-svg-icons'
import {withRouter} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import {Toast} from 'react-bootstrap'
import {Row} from 'react-bootstrap'
import {Col} from 'react-bootstrap'
import check from '../mobileCheck'

window.mobileCheck = check

class BrowseChannels extends React.Component {
  constructor() {
    super()
    this.state = {
      showA: true
    }
    this.toggleShowA = this.toggleShowA.bind(this)
    this.timeOut = this.timeOut.bind(this)
  }
  componentDidMount() {
    this.props.getBrowseChannels()
  }

  toggleShowA(event) {
    this.setState({
      showA: false
    })
  }

  timeOut(channel) {
    let add = this.props.joinChannel(this.props.user.id, channel.id)
    alert(
      `You have been added to the ${
        channel.name
      } channel, you now have access to browse ${channel.name} recipes`
    )
    setTimeout(() => {
      this.props.history.push('/channels')
    }, 500)
  }

  render() {
    const browseChannels = this.props.browseChannels

    return (
      <>
        <Row
          style={{
            position: 'center',
            minHeight: '50px'
          }}
        >
          <Col xs={6}>
            <Toast
              show={this.state.showA}
              onClose={this.toggleShowA}
              style={{
                position: 'absolute',
                top: 0,
                right: 0
              }}
            >
              <Toast.Header>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded mr-2"
                  alt=""
                />
                <strong className="mr-auto">Welcome</strong>
              </Toast.Header>
              <Toast.Body>Join Public Channels below!</Toast.Body>
            </Toast>
          </Col>
        </Row>
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
                <div>
                  <Card.ImgOverlay
                    style={{display: 'flex', justifyContent: 'space-between'}}
                  >
                    <div>
                      <Card.Title>
                        {currChannel.name}{' '}
                        <FontAwesomeIcon icon={faGlobeAmericas} />
                      </Card.Title>

                      {check() ? (
                        ''
                      ) : (
                        <Card.Text>{currChannel.description}</Card.Text>
                      )}
                      <div>
                        <Button
                          type="button"
                          data-dismiss="alert"
                          aria-label="Close"
                          onClick={() => this.timeOut(currChannel)}
                        >
                          Join Public Channel
                        </Button>
                      </div>
                    </div>
                  </Card.ImgOverlay>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </>
    )
  }
}

const mapState = state => ({
  browseChannels: state.browseChannels,
  user: state.user,
  channels: state.channels
})

const mapDispatch = dispatch => ({
  getBrowseChannels: () => dispatch(getBrowseChannels()),
  joinChannel: (userId, channelId) => dispatch(joinChannel(userId, channelId))
})

export default withRouter(connect(mapState, mapDispatch)(BrowseChannels))
