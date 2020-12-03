import React from 'react'
import {connect} from 'react-redux'
import {Button, Form} from 'react-bootstrap'
import {fetchChannel, updateChannel} from '../../store/single-channel'

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

  async componentDidMount() {
    await this.props.getChannel(8)
    this.setState({description: this.props.channel.description})
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value, isActive: true})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.channel.description = this.state.description
    this.props.updateChannel(this.props.channel)
    //still needs help re rending with the right name
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
          {/* <Form.Text className="text-muted">
          Names can’t be longer than 80 characters.
        </Form.Text> */}
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

const mapState = state => ({
  channel: state.singleChannel.channel
})

const mapDispatch = dispatch => ({
  getChannel: channelId => dispatch(fetchChannel(channelId)),
  updateChannel: channel => dispatch(updateChannel(channel))
})

export default connect(mapState, mapDispatch)(ChannelDescription)
