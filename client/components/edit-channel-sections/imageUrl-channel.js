import React from 'react'
import {connect} from 'react-redux'
import {Button, Form, Image} from 'react-bootstrap'
import {fetchChannel, updateChannel} from '../../store/single-channel'

class ImageUrlChannel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imageUrl: '',
      isActive: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    await this.props.getChannel(8)
    this.setState({imageUrl: this.props.channel.imageUrl})
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value, isActive: true})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.channel.imageUrl = this.state.imageUrl
    this.props.updateChannel(this.props.channel)
    //still needs help re rending with the right name
    this.props.handleClose()
  }

  render() {
    if (!this.props.channel) return <h1>Loading</h1>
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="imageUrl">
          <Form.Label>Channel Image</Form.Label>
          <br />
          {/* edit images width and find a way to store it */}
          <Image
            src={this.state.imageUrl}
            style={{width: '180px', height: '171px'}}
            className="mb-1"
            rounded
          />{' '}
          <br />
          <Form.File
            id="imageUpload"
            name="imageUrl"
            className="m-0 mb-1"
            onChange={this.handleChange}
          />
          <br />{' '}
          <Button variant="outline-secondary" onClick={this.props.handleClose}>
            Cancel
          </Button>{' '}
          {this.state.isActive ? (
            <Button variant="success" active type="submit">
              Update Image
            </Button>
          ) : (
            <Button variant="success" disabled type="submit">
              Update Image
            </Button>
          )}
        </Form.Group>
      </Form>
    )
  }
}

const mapState = state => ({
  channel: state.singleChannel.channel
})

const mapDispatch = dispatch => ({
  getChannel: channelId => dispatch(fetchChannel(channelId)),
  updateChannel: channel => dispatch(updateChannel(channel))
})

export default connect(mapState, mapDispatch)(ImageUrlChannel)
