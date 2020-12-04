import io from 'socket.io-client'
import store from './store'
import {
  finishSession,
  resetVideo,
  setMyVideo,
  setPartnerVideo
} from './store/videos'

const socket = io(window.location.origin)

let localStream
let isCaller = false
let rtcPeerConnection

//Public servers for decives with no ip addresses. Something like that
const iceServers = {
  iceServers: [
    {urls: 'stun:stun.services.mozilla.com'},
    {urls: 'stun:stun.l.google.com:19302'}
  ]
}

const constraints = {
  video: {facingMode: 'user'},
  audio: true
}

// handler functions for our WebRTC socket connections
async function onIceCandidate(event) {
  if (event.candidate) {
    socket.emit('candidate', {
      type: 'candidate',
      //RTC Ice Candidate the optional read only property specifies the value of ice canditate - a number containing
      label: event.candidate.sdpMLineIndex,
      //A DOMString specifying the candidate's media stream identification tag which uniquely identifies the media stream within the component with which the candidate is associated, or null if no such association exists.
      id: event.candidate.sdpMid,
      candidate: event.candidate.candidate,
      room: 1 //roomId
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

//kade test code from vide

// socket.on('join-room', (userId, roomId)=> {
//   console.log('in socket', userId, roomId)
// })

socket.on('created', async function(room) {
  //will run for the first person in the room
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints)
    localStream = stream
    isCaller = true
    //we need to make this thunk
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
    //we need to make this thunk
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
      const sessionDescription = await rtcPeerConnection.createOffer()
      rtcPeerConnection.setLocalDescription(sessionDescription)
      socket.emit('offer', {
        type: 'offer',
        sdp: sessionDescription,
        room: 1 //roomId
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
      const sessionDescription = await rtcPeerConnection.createAnswer()
      rtcPeerConnection.setLocalDescription(sessionDescription)
      socket.emit('answer', {
        type: 'answer',
        sdp: sessionDescription,
        room: 1 //roomId
      })
    } catch (error) {
      console.error(error)
    }
  }
})

socket.on('finishSession', function(event) {
  //need thunks
  store.dispatch(finishSession())
})

socket.on('closeSession', function() {
  //need thunks
  store.dispatch(resetVideo())
  window.location = '/channels'
})

socket.on('answer', function(event) {
  rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(event))
})
export default socket
