import io from 'socket.io-client'
import store from './store'
import {
  setMyVideo,
  setPartnerVideo,
  resetVideo,
  removePartnerVideo
} from './store/videos'
import {roomId} from './components/Room'
import {fetchEvents} from './store/events'
const socket = io(window.location.origin) //looks for the url
let localStream
let isCaller = false
let rtcPeerConnection

const iceServers = {
  iceServers: [
    {urls: 'stun:stun.services.mozilla.com'},
    {urls: 'stun:stun.l.google.com:19302'}
  ]
}

const constraints = {
  video: true,
  // Uncomment to enable audio
  audio: true
}

// handler functions for our WebRTC socket connections
async function onIceCandidate(event) {
  if (event.candidate) {
    socket.emit('candidate', {
      type: 'candidate',
      label: event.candidate.sdpMLineIndex,
      id: event.candidate.sdpMid,
      candidate: event.candidate.candidate,
      room: roomId
    })
  }
}

//adds the remote/other users video
function onAddStream(event) {
  const remoteVideo = event.streams[0]
  store.dispatch(setPartnerVideo(remoteVideo))
}

socket.on('connect', () => {
  console.log('Connected!')
})
socket.on('added event', function(userId) {
  store.dispatch(fetchEvents(userId))
})

socket.on('added event', function(userId) {
  store.dispatch(fetchEvents(userId))
})

socket.on('created', async function(room) {
  //will run for the first person in the room
  try {
    console.log('created!!!!!!', constraints)
    const stream = await navigator.mediaDevices.getUserMedia(constraints)
    localStream = stream
    isCaller = true
    store.dispatch(setMyVideo(localStream))
  } catch (error) {
    console.log('An error ocurred when accessing media devices', error)
  }
})

socket.on('joined', async function(room) {
  //will run for the second person in the room
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints)
    localStream = stream
    socket.emit('ready', room)
    store.dispatch(setMyVideo(localStream))
  } catch (error) {
    console.log('An error ocurred when accessing media devices', error)
  }
})

socket.on('candidate', function(event) {
  const candidate = new RTCIceCandidate({
    sdpMLineIndex: event.label,
    candidate: event.candidate
  })
  rtcPeerConnection.addIceCandidate(candidate)
})

socket.on('ready', async function() {
  //first person sending a offer to start the call/peer to peer connection
  if (isCaller) {
    rtcPeerConnection = new RTCPeerConnection(iceServers)
    rtcPeerConnection.onicecandidate = onIceCandidate
    rtcPeerConnection.ontrack = onAddStream
    rtcPeerConnection.addTrack(localStream.getTracks()[0], localStream)
    rtcPeerConnection.addTrack(localStream.getTracks()[1], localStream)
    try {
      const eventDescription = await rtcPeerConnection.createOffer()
      rtcPeerConnection.setLocalDescription(eventDescription)
      socket.emit('offer', {
        type: 'offer',
        sdp: eventDescription,
        room: roomId
      })
    } catch (error) {
      console.error(error)
    }
  }
})

socket.on('offer', async function(event) {
  //accepting and answering the offer
  if (!isCaller) {
    rtcPeerConnection = new RTCPeerConnection(iceServers)
    //adds event listeners to the newly created object
    rtcPeerConnection.onicecandidate = onIceCandidate
    rtcPeerConnection.ontrack = onAddStream
    //adds current local stream to the object
    rtcPeerConnection.addTrack(localStream.getTracks()[0], localStream)
    rtcPeerConnection.addTrack(localStream.getTracks()[1], localStream)
    //stores the offer as a remote description
    rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(event))
    try {
      const eventDescription = await rtcPeerConnection.createAnswer()
      rtcPeerConnection.setLocalDescription(eventDescription)
      socket.emit('answer', {
        type: 'answer',
        sdp: eventDescription,
        room: roomId
      })
    } catch (error) {
      console.error(error)
    }
  }
})

socket.on('answer', function(event) {
  const description = rtcPeerConnection.setRemoteDescription(
    new RTCSessionDescription(event)
  )
  console.log('remote description: ', description)
})

socket.on('closeSession', function(room) {
  console.log('in client close session')
  store.dispatch(resetVideo())
  console.log('end of client socket')
  //watch out for room
  socket.emit('remove video', room)

  window.location = '/home/get-cookin'
})

socket.on('remove video', function(room) {
  console.log('made it to client side remove video socket')
  store.dispatch(removePartnerVideo())
  console.log('after client side remove video socket')
})

export default socket
