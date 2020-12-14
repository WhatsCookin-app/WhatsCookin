import React from 'react'
import {Button, Modal} from 'react-bootstrap'
import {connect} from 'react-redux'
import {leaveChannel} from '../store/channel'

const LeaveChannel = ({channelId, leave}) => {
  return (
    <div className="ml-1">
      <Button variant="danger" onClick={() => leave(channelId)}>
        Leave Channel
      </Button>
    </div>
  )
}

const mapDispatch = dispatch => ({
  leave: channelId => dispatch(leaveChannel(channelId))
})
export default connect(null, mapDispatch)(LeaveChannel)
