import React, {useEffect, useRef, useState} from 'react'
import {useParams} from 'react-router'
import {fetchVideo} from '../store/events'
import {connect} from 'react-redux'
// import {withRouter, Route, Switch} from 'react-router-dom'
import socket from '../socket'
import Room from './Room'

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
  return (
    <div>

      <Room roomId={params.roomId} />
      <h1>Get Cooking with Friends at {params.roomId}</h1>
      <video autoPlay playsInline muted />
      <video id="localVideo" autoPlay playsInline muted ref={userVideo} />
      <video id="remoteVideo" autoPlay playsInline muted ref={partnerVideo} />
    </div>
  )
}

const mapState = state => {
  return {
    videos: state.videos
  }
}

export default connect(mapState)(VideoSession)
