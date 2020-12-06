import React from 'react'
import {Button, Form} from 'react-bootstrap'

class RenameChannel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      isActive: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.setState({name: this.props.channel.name})
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value, isActive: true})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.channel.name = this.state.name
    this.props.updateChannel(this.props.channel)
    this.props.handleClose()
  }

  render() {
    if (!this.props.channel) return <h1>Loading</h1>
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            type="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <Form.Text className="text-muted">
            Names can’t be longer than 80 characters.
          </Form.Text>
          <Button variant="outline-secondary" onClick={this.props.handleClose}>
            Cancel
          </Button>{' '}
          {this.state.isActive ? (
            <Button variant="success" active type="submit">
              Rename
            </Button>
          ) : (
            <Button variant="success" disabled type="submit">
              Rename
            </Button>
          )}
        </Form.Group>
      </Form>
    )
  }
}

export default RenameChannel
