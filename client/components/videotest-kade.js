import React, {useEffect, useRef, useState} from 'react'
import {connect} from 'react-redux'
import socket from '../socket'

const VideoSession = props => {
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

  return (
    <div>
      <h1>Get Cooking with Friends at {props.room}</h1>
      {/* <video autoPlay playsInline muted></video> */}

      <video id="localVideo" autoPlay playsInline muted ref={userVideo} />
      <video id="remoteVideo" autoPlay playsInline muted ref={partnerVideo} />
    </div>
  )
}

export default VideoSession
