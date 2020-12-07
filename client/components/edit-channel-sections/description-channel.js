import React from 'react'
import {Button, Form} from 'react-bootstrap'

class ChannelDescription extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      description: '',
      isActive: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.setState({description: this.props.channel.description})
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value, isActive: true})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.channel.description = this.state.description
    this.props.updateChannel(this.props.channel)
    this.props.handleClose()
  }

  render() {
    if (!this.props.channel) return <h1>Loading</h1>
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            as="textarea"
            value={this.state.description}
            onChange={this.handleChange}
          />
          <Button variant="outline-secondary" onClick={this.props.handleClose}>
            Cancel
          </Button>{' '}
          {this.state.isActive ? (
            <Button variant="success" active type="submit">
              Update Description
            </Button>
          ) : (
            <Button variant="success" disabled type="submit">
              Update Description
            </Button>
          )}
        </Form.Group>
      </Form>
    )
  }
}

export default ChannelDescription
