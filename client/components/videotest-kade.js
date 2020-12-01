import React from 'react'

class VideoSession extends React.Component {
  async componentDidMount() {
    console.log('Mounted Video Test')
    const video = document.querySelector('video')

    const openMediaDevices = async (constraints) => {
      return await navigator.mediaDevices.getUserMedia(constraints)
    }
    try {
      const stream = await openMediaDevices({video: true, audio: true})
      console.log('Got MediaStream:', stream)
      //was giving me an over load error
      // video.src = window.URL.createObjectURL(stream)
      video.srcObject = stream
    } catch (error) {
      console.error('Error accessing media devices.', error)
    }
  }
  //  componentDidUpdate() {
  //   console.log('updated')

  // }

  render() {
    return (
      <div>
        <h1>Check the console.logs</h1>
        <video autoPlay playsInline></video>
      </div>
    )
  }
}

export default VideoSession
