import React, {useEffect, useRef, useState} from 'react'
import {useParams, useLocation} from 'react-router'
import {connect} from 'react-redux'
import socket from '../socket'
import Room from './Room'
import {Button, Card} from 'react-bootstrap'
import {render} from 'enzyme'
import {fetchVideoEvent} from '../store/videoEvent'

class VideoSession extends React.Component {
  constructor(props) {
    super(props)
    this.userVideo = React.createRef()
    this.partnerVideo = React.createRef()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    socket.emit('create or join', this.props.match.params.roomId)
    this.props.getEvent(this.props.match.params.roomId)
  }

  componentDidUpdate() {
    if (this.userVideo.current && this.props.videos.myVideo.id) {
      this.userVideo.current.srcObject = this.props.videos.myVideo
    }
    if (
      this.partnerVideo.current &&
      this.props.videos.partnersVideo &&
      this.props.videos.partnersVideo.id
    ) {
      this.partnerVideo.current.srcObject = this.props.videos.partnersVideo
    }
  }

  handleClick() {
    socket.emit('closeSession', this.props.match.params.roomId)
  }

  render() {
    if (!this.props.videoEvent.id) {
      return null
    }
    return (
      <div className="view bg-dark">
        <Room roomId={this.props.match.params.roomId} />

        <div className="d-flex">
          <div className="m-5">
            <Card className="sm ng-light">
              <Card.Title>{this.props.videoEvent.name}</Card.Title>
              <Card.Text>{this.props.videoEvent.description}</Card.Text>
              <Card.Text>
                Participants:{' '}
                <span className="text-dark font-weight-bold">
                  @{this.props.videoEvent.organizer.userName}{' '}
                </span>{' '}
                and{' '}
                <span className="text-dark font-weight-bold">
                  @{this.props.videoEvent.guest.userName}
                </span>{' '}
              </Card.Text>
            </Card>
          </div>
        </div>
        <div className="d-flex flex-column align-items-center justify-content-center">
          <div className="d-flex flex-column">
            <div className="d-flex flex-row mb-5 align-items-center justify-content-center">
              <div>
                <video
                  id="localVideo"
                  autoPlay
                  playsInline
                  muted
                  ref={this.userVideo}
                />
              </div>
              <div>
                {/* remove muted */}
                {this.props.videos.partnersVideo &&
                this.props.videos.partnersVideo.id ? (
                  <video
                    id="remoteVideo"
                    autoPlay
                    playsInline
                    muted
                    ref={this.partnerVideo}
                  />
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className="d-flex justify-conter-center">
              <Button
                type="button"
                variant="danger"
                onClick={() => this.handleClick()}
                className="mt-3"
              >
                Leave Meeting
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    videos: state.videos,
    videoEvent: state.videoEvent
  }
}

const mapDispatch = dispatch => ({
  getEvent: roomId => dispatch(fetchVideoEvent(roomId))
})

export default connect(mapState, mapDispatch)(VideoSession)
