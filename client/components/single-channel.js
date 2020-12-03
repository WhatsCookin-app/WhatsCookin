import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Modal} from 'react-bootstrap'
//would be great to allow users to upload their own images here from their devices for image url
class SingleChannel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      imageUrl: '',
      isPrivate: false
    }
    this.handleChange = this.handleChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    const {channelId, channels} = this.props

    const result = channels.filter(
      currChannel => currChannel.channelId === channelId
    )
    // console.log(thisChannel)
    const thisChannel = result[0].channel
    //Make a modal
    return (
      <>
        <h1>About {thisChannel.name}</h1>
        <form id="edit-channel-form">
          <label htmlFor="name">Name</label>
          <input name="name" type="text" value={this.state.name} />
          <label htmlFor="description">Description</label>
          <input
            name="description"
            type="text"
            value={this.state.description}
          />
          <label htmlFor="imageUrl">Image Url</label>
          <input name="imageUrl" type="text" value={this.state.imageUrl} />
          <label htmlFor="isPrivate">Private</label>
          <input name="isPrivate" type="checkbox" />
        </form>
      </>
    )
  }
}

// const mapState = state => ({
//   channels: state.channels
// })

const mapDispatch = dispatch => ({
  handleSubmit: channelId => dispatch(fetchChannel(channelId))
})

// export default connect(mapState)(SingleChannel)

export default SingleChannel
