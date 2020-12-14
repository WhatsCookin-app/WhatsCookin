import React from 'react'
import {Form} from 'react-bootstrap'
import {connect} from 'react-redux'

const SelectChannel = props => {
  if (!props.channels.length) return <p>Looking for Channels</p>
  return (
    <Form className="flex-end">
      <Form.Group controlId="campus">
        <Form.Label name="campus">Select a Channel for your Recipe</Form.Label>
        <Form.Control as="select" onChange={props.handleChange}>
          <option>select channel</option>
          {props.channels.map(channel => (
            <option key={channel.id} value={channel.channel.id}>
              {channel.channel.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    </Form>
  )
}

export default SelectChannel
