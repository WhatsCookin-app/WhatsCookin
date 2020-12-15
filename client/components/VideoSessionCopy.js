import React, {useEffect, useRef, useState} from 'react'
import {useParams, useLocation} from 'react-router'
import {connect} from 'react-redux'
import socket from '../socket'
import Room from './Room'
import {Button, Card} from 'react-bootstrap'
import {fetchVideoEvent} from '../store/videoEvent'
import {AddRecipe, SelectChannel} from './index'
import {fetchChannels} from '../store/channel'

class VideoSession extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      channelId: '',
      show: true
    }
    this.userVideo = React.createRef()
    this.partnerVideo = React.createRef()
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.close = this.close.bind(this)
  }

  componentDidMount() {
    socket.emit('create or join', this.props.match.params.roomId)
    this.props.getEvent(this.props.match.params.roomId)
    this.props.getChannels()
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
  handleChange(event) {
    this.setState({channelId: event.target.value})
  }

  close() {
    this.setState({show: false})
  }

  render() {
    if (!this.props.videoEvent.id) {
      return null
    }
    return (
      <div className="view">
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
              <div id="localVideoDiv">
                <video
                  id="localVideo"
                  autoPlay
                  playsInline
                  muted
                  ref={this.userVideo}
                />
              </div>
              <div id="remoteVideoDiv">
                {/* remove muted */}
                {this.props.videos.partnersVideo &&
                this.props.videos.partnersVideo.id ? (
                  <video
                    id="remoteVideo"
                    autoPlay
                    playsInline
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
          {this.state.show ? (
            <div className="d-flex flex-column justify-content-center align-items-center m-5">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <h1>Upload a Recipe Together</h1>
                <p className="m-0">
                  Feel free to collaborate on writting a recipe together. When
                  submitting, make sure that each of you choose a channel for
                  this recipe if you both wish to upload it to your personal
                  channels, or have one person submit. If you want to upload an
                  image as well, make sure to upload your own images and submit
                  individually. You can always leave the photo blank, and edit
                  your masterpiece later under your profile's My Recipes view.
                </p>
                <SelectChannel
                  channels={this.props.channels}
                  handleChange={this.handleChange}
                />
              </div>

              <AddRecipe
                inVideo={true}
                channelId={this.state.channelId}
                close={this.close}
              />
            </div>
          ) : (
            <p className="justify-content-center align-items-center m-5">
              Your new recipe was uploaded!
            </p>
          )}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    videos: state.videos,
    videoEvent: state.videoEvent,
    channels: state.channels
  }
}

const mapDispatch = dispatch => ({
  getEvent: roomId => dispatch(fetchVideoEvent(roomId)),
  getChannels: () => dispatch(fetchChannels())
})

export default connect(mapState, mapDispatch)(VideoSession)
