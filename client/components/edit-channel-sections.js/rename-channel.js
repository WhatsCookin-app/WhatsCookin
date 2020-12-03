import React from 'react'
import {connect} from 'react-redux'
import {Button, Form} from 'react-bootstrap'

class RenameChannel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      isActive: false
    }
  }

  render() {
    const isActive = this.state.isActive

    return (
      <Form>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="" />
        </Form.Group>
      </Form>
      // <form>
      //   <label htmlFor="name">Name</label>
      //     <input
      //       name="name"
      //       type="text"
      //       value={this.props.name}
      //       />
      //     <Button
      //       variant="outline-secondary"
      //       >Cancel</Button>
      //     <Button>Rename Channel</Button>

      // </form>
    )
  }
}

export default connect()(RenameChannel)
