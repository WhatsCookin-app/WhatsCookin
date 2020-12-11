import React, {useEffect, useRef, useState} from 'react'
import {useParams} from 'react-router'
import {connect} from 'react-redux'
import socket from '../socket'
import Room from './Room'
import {Button} from 'react-bootstrap'

const VideoSession = props => {
  const params = useParams()
  const userVideo = useRef()
  const partnerVideo = useRef()

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
  })

  function handleClick() {
    console.log('in handleclick in videosession')
    console.log('roomId: ', params.roomId)
    socket.emit('closeSession', params.roomId)
  }
  return (
    <div className="view">
      <Room roomId={params.roomId} />
      <h1>Get Cooking with Friends at {params.roomId}</h1>
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
            <video
              id="remoteVideo"
              autoPlay
              playsInline
              muted
              ref={partnerVideo}
            />
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
