import io from 'socket.io-client'

const socket = io(window.location.origin)

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
  video: {facingMode: 'user'},
  // Uncomment to enable audio
  audio: true
}

socket.on('connect', () => {
  console.log('Connected!')
})

export default socket
