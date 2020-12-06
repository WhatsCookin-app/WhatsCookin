import React from 'react'
import {Button, Form} from 'react-bootstrap'

class AddChannel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      deleteCheckbox: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    console.log('delete channel component')
  }

  handleChange() {
    const bool = this.state.deleteCheckbox
    this.setState({deleteCheckbox: !bool})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.deleteChannel(this.props.channel.id)
    this.props.handleClose()
  }

  render() {
    if (!this.props.channel) return <h1>Loading</h1>
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="deleteCheckbox" onChange={this.handleChange}>
          <Form.Label className>
            Are you sure you want to delete {this.props.channel.name}? All the
            users and channel details will be removed from WhatsCookin
            immedietly. Recipes, however, will not be deleted for individual
            users. This action cannot be undone.{' '}
          </Form.Label>
          <Form.Check
            type="checkbox"
            label="Yes, permanently delete this channel"
            name="deleteCheckbox"
          />
          <Button variant="outline-secondary" onClick={this.props.handleClose}>
            Cancel
          </Button>{' '}
          {this.state.deleteCheckbox ? (
            <Button variant="danger" type="submit" size="sm">
              Delete Channel
            </Button>
          ) : (
            <Button variant="danger" type="submit" size="sm" disabled>
              Delete Channel
            </Button>
          )}
        </Form.Group>
      </Form>
    )
  }
}

export default AddChannel
