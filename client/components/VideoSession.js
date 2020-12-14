import React, {useEffect, useRef} from 'react'
import {useParams, useLocation} from 'react-router'
import {connect} from 'react-redux'
import socket from '../socket'
import Room from './Room'
import {Button} from 'react-bootstrap'

const VideoSession = props => {
  console.log('pros: ', props)
  const params = useParams()
  const location = useLocation()
  console.log('location hook: ', location)
  const userVideo = useRef()
  const partnerVideo = useRef()
  socket.emit('create or join', params.roomId)

  useEffect(() => {
    if (userVideo.current && props.videos.myVideo.id) {
      userVideo.current.srcObject = props.videos.myVideo
    }
    if (
      partnerVideo.current &&
      props.videos.partnersVideo &&
      props.videos.partnersVideo.id
    ) {
      partnerVideo.current.srcObject = props.videos.partnersVideo
    }
    //   else if(partnerVideo.current && props.videos.partnersVideo && !props.videos.partnersVideo.id) {
    //     partnerVideo.current= {}
    //   }
  })

  function handleClick() {
    console.log('in handleclick in videosession')
    console.log('roomId: ', params.roomId)
    socket.emit('closeSession', params.roomId)
  }
  return (
    <div className="view">
      <Room roomId={params.roomId} />
      {/* <h1>{location.state.name}</h1>
      <h5>{location.state.description}</h5> */}
      <div className="d-flex flex-row justify-content-around mb-5">
        <div className="d-flex flex-column">
          <div>
            <video id="localVideo" autoPlay playsInline muted ref={userVideo} />
          </div>
          <div className="d-flex justify-content-end">
            <Button
              type="button"
              variant="info"
              onClick={() => handleClick()}
              className="mt-3"
            >
              Hang Up
            </Button>
          </div>
        </div>
        <div>
          <div>
            {/* remove muted */}
            {props.videos.partnersVideo && props.videos.partnersVideo.id ? (
              <video
                id="remoteVideo"
                autoPlay
                playsInline
                muted
                ref={partnerVideo}
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

const mapState = state => {
  return {
    videos: state.videos
  }
}

export default connect(mapState)(VideoSession)
