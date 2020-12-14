import React, {useEffect, useRef, useState} from 'react'
import {useParams, useLocation} from 'react-router'
import {connect} from 'react-redux'
import socket from '../socket'
import Room from './Room'
import {Button} from 'react-bootstrap'
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
      <div className="view">
        <Room roomId={this.props.match.params.roomId} />
        <div className="m-3">
          <h1>{this.props.videoEvent.name}</h1>
          <h5>{this.props.videoEvent.description}</h5>
          Participants:{' '}
          <span className="text-kade font-weight-bold">
            @{this.props.videoEvent.organizer.userName}{' '}
          </span>{' '}
          and{' '}
          <span className="text-kade font-weight-bold">
            @{this.props.videoEvent.guest.userName}
          </span>{' '}
        </div>
        <div className="d-flex flex-row mb-5 align-items-center justify-content-center">
          <div className="d-flex flex-column">
            <div>
              <video
                id="localVideo"
                autoPlay
                playsInline
                muted
                ref={this.userVideo}
              />
            </div>
            <div className="d-flex justify-content-end">
              <Button
                type="button"
                variant="info"
                onClick={() => this.handleClick()}
                className="mt-3"
              >
                Hang Up
              </Button>
            </div>
          </div>
          <div>
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
