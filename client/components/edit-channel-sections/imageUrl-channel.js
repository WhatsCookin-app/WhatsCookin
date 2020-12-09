import React from 'react'
import {Button, Form, Image} from 'react-bootstrap'
import axios from 'axios'

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

  componentDidMount() {
    this.setState({imageUrl: this.props.channel.imageUrl})
  }

  async handleChange(event) {
    let imageFormObj = new FormData()
    imageFormObj.append('imageData', event.target.files[0])
    const {data} = await axios.post('/api/image/upload', imageFormObj)

    this.setState({isActive: true, imageUrl: data})
  }

  handleSubmit(event) {
    event.preventDefault()

    this.props.channel.imageUrl = this.state.imageUrl
    this.props.updateChannel(this.props.channel)
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

export default ImageUrlChannel
