import React from 'react'
import {Button, Form} from 'react-bootstrap'
import {connect} from 'react-redux'
import {createChannel} from '../../store/channel'
import axios from 'axios'

class AddChannel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      deleteCheckbox: false,
      name: '',
      description: '',
      imageUrl:
        'https://mzo5g3ubj8u20bigm1x3cth1-wpengine.netdna-ssl.com/wp-content/uploads/2017/05/Eat-this-to-build-muscle-M-610x407.jpg',
      isPrivate: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    console.log('add channel component')
  }

  async handleChange() {
    let imageFormObj = new FormData()
    imageFormObj.append('imageData', event.target.files[0])
    const {data} = await axios.post('/api/image/upload', imageFormObj)

    this.setState({imageUrl: data})
  }

  handleInputChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    let {name, description, imageUrl, isPrivate} = this.state
    this.props.createChannel({name, description, isPrivate, imageUrl})
    this.props.close()
  }

  render() {
    let makePrivate = this.state.isPrivate

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group className="mb-0">
          <Form.Label>
            Channels are spaces where you can share and explore recipes. They’re
            best when focused on a type of cuisine, diatary restriction, or a
            friend group.
          </Form.Label>
        </Form.Group>
        <Form.Group controlId="name" className="mb-1 mt-1">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            type="name"
            placeholder="e.g Family Recipes"
            value={this.state.name}
            onChange={this.handleInputChange}
          />
          <Form.Text className="text-muted">
            Names can’t be longer than 80 characters.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="description" className="mb-1 mt-1">
          <Form.Label>
            Description <span className="text-muted">(Optional)</span>
          </Form.Label>
          <Form.Control
            name="description"
            type="description"
            value={this.state.description}
            onChange={this.handleInputChange}
          />
          <Form.Text className="text-muted">
            Who are these recipes for?
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="imageUrl" className="mb-1 mt-1">
          <Form.Label>
            Channel Image
            <span className="text-muted">(Optional)</span>
          </Form.Label>
          {/* edit images width and find a way to store it */}
          {/* {' '} */}
          <br />
          <Form.File
            id="imageUpload"
            name="imageUrl"
            className="m-0 mb-1"
            onChange={this.handleChange}
          />
          <br />{' '}
        </Form.Group>
        <Form.Group
          controlId="isPrivate"
          onChange={() => this.setState({isPrivate: !makePrivate})}
          className="mb-1 mt-1"
        >
          <Form.Label>Make Private</Form.Label>
          {this.state.isPrivate ? (
            <div className="d-flex flex-nowrap justify-items-between m-0 align-items-center">
              <Form.Label className="text-muted">
                This can’t be undone. A private channel cannot be made public
                later on.
              </Form.Label>
              <Form.Check
                type="checkbox"
                label="Private?"
                name="isPrivate"
                value={this.state.name}
                onChange={this.handleInputChange}
              />
            </div>
          ) : (
            <div className="d-flex flex-nowrap justify-items-between m-0 align-items-center">
              <Form.Label className="text-muted">
                When a channel is set to private, it can only be viewed or
                joined by invitation.
              </Form.Label>
              <Form.Check type="checkbox" label="Private?" name="isPrivate" />
            </div>
          )}
        </Form.Group>
        {this.state.name ? (
          <div className="d-flex justify-content-end mr-4 mt-1">
            <Button variant="info" type="submit">
              Create
            </Button>
          </div>
        ) : (
          <div className="d-flex justify-content-end mr-4 mt-1">
            <Button variant="info" type="submit" disabled>
              Create
            </Button>
          </div>
        )}
      </Form>
    )
  }
}

const mapDispatch = dispatch => ({
  createChannel: channel => dispatch(createChannel(channel))
})

export default connect(null, mapDispatch)(AddChannel)
