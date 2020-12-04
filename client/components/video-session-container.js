import React, {useEffect, useRef, useState} from 'react'
import {connect} from 'react-redux'
// import { useHistory} from 'react-router-dom'
// import MessagesList from './MessagesList';
import socket from '../socket'
import {finishSession} from '../store/videos'
import VideoSession from './videotest-kade'
// import Chat from './Chat'

export let roomId

const Session = props => {
  // const session = props.session
  // const history = useHistory()
  roomId = 1
  socket.emit('create or join', roomId)

  //session.roomId

  // useEffect(() => {
  //   if(!session.users || session.status !== 'matched'){
  //       props.getSession(props.user.id)
  //   }
  // })

  // const getSummaryForm = () => {
  //   socket.emit('finishSession', roomId);
  //   props.finishSession()
  // }

  return (
    //render two videos
    <div>
      <header className="text-center blurb">
        {/* SESSION PROMPT: */}
        {/* <p className="text-center blurb">{session.blurb}</p> */}
      </header>
      <VideoSession />
    </div>
  )
}

const mapState = state => {
  return {
    // session: state.singleSession,
    user: state.user,
    videos: state.videos
  }
}

const mapDispatch = dispatch => {
  return {
    // getSession: (userId) => dispatch(getMatchedSessionThunk(userId)),
    finishSession: () => dispatch(finishSession())
  }
}

export default connect(mapState, mapDispatch)(Session)
