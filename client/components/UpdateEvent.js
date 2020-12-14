import React from 'react'
import {Modal, Form, Button} from 'react-bootstrap'
import axios from 'axios'
import {deleteEvent, updateEvent} from '../store/events'
import {connect} from 'react-redux'
import moment from 'moment'

class UpdateEvent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      name: '',
      description: '',
      imageUrl: '',
      date: '',
      time: ''
    }

    // this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleImageInput = this.handleImageInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    let newTime = new Date(this.props.event.eventDate).toLocaleTimeString()
    if (newTime.slice(-2) === 'AM') {
      newTime = newTime.slice(0, -6)
      if (newTime.length === 4) {
        newTime = '0' + newTime
      }
    } else if (newTime.slice(-2) === 'PM') {
      if (newTime.slice(2, 3) === ':') {
        newTime = (
          String(Number(newTime.slice(0, 2)) + 12) + newTime.slice(2)
        ).slice(0, -3)
      } else if (newTime.slice(1, 2) === ':') {
        newTime = (
          String(Number(newTime.slice(0, 1)) + 12) + newTime.slice(1)
        ).slice(0, -3)
      }
    }
    this.setState({
      id: this.props.event.id,
      name: this.props.event.name,
      description: this.props.event.description,
      //date: new Date(this.props.event.eventDate).toISOString().split('T')[0],
      date: moment(new Date(this.props.event.eventDate).toLocaleDateString())
        .format()
        .slice(0, 10),
      time: newTime,
      imageUrl: this.props.event.imageUrl
    })
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleImageInput = this.handleImageInput.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  async handleImageInput(event) {
    let imageFormObj = new FormData()
    imageFormObj.append('imageData', event.target.files[0])
    const {data} = await axios.post('/api/image/upload', imageFormObj)

    this.setState({imageUrl: data})
  }

  handleChange(event) {
    console.log('target field: ', event.target.name)
    console.log('target value: ', event.target.value)
    console.log('convert: ', event.target.value + ':00')
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()

    // let date = this.state.date && this.state.time ? (this.state.date + ' ' + this.state.time + ':00') : this.state.date ? (this.state.date + ' '
    let eventDate = this.state.date + ' ' + this.state.time + ':00'
    if (eventDate.length > 19) {
      eventDate = eventDate.slice(0, 19)
    }
    this.props.updateEvent(
      {
        id: this.state.id,
        name: this.state.name,
        description: this.state.description,
        // eventDate:
        //   this.state.date.slice(5) +
        //   '-' +
        //   this.state.date.slice(0, 4) +
        //   ' ' +
        //   this.state.time +':00',
        eventDate: eventDate,
        imageUrl: this.state.imageUrl,
        organizerId: this.props.event.organizerId
      },

      this.props.user.id
    )
    this.props.handleClose(false)
  }

  handleDelete() {
    console.log(this.props.event.id)
    this.props.deleteEvent(this.props.event.id, this.props.user.id)
    this.props.handleClose(false)
  }

  render() {
    console.log('state date: ', this.state.date)
    console.log('state time: ', this.state.time)
    console.log('try moment: ', moment('09/24/2019').format())
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Your Event</Modal.Title>
        </Modal.Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Event Name</Form.Label>
            <Form.Control
              name="name"
              type="name"
              style={{marginLeft: '100px'}}
              value={this.state.name}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Event Description</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              name="description"
              type="description"
              style={{marginLeft: '100px'}}
              value={this.state.description}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="date">
            <Form.Label>Event Date</Form.Label>
            <Form.Control
              name="date"
              type="date"
              value={this.state.date}
              onChange={this.handleChange}
              style={{marginLeft: '100px'}}
            />
          </Form.Group>
          <Form.Group controlId="time">
            <Form.Label>Event Time</Form.Label>
            <Form.Control
              name="time"
              type="time"
              value={this.state.time}
              onChange={this.handleChange}
              style={{marginLeft: '100px'}}
            />
          </Form.Group>
          <Form.Group controlId="imageUrl">
            <Form.Label>Event Image</Form.Label>
            <br />
            <Form.File
              id="imageUpload"
              name="imageUrl"
              className="m-0 mb-1"
              onChange={this.handleImageInput}
            />
            <br />{' '}
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="success" active type="submit" className="m-1">
              Update
            </Button>
            <Button
              variant="danger"
              onClick={this.handleDelete}
              className="m-1"
            >
              Delete
            </Button>
          </div>
        </Form>
      </Modal>
    )
  }
}

const mapDispatch = dispatch => ({
  updateEvent: (updatedEvent, eventId) =>
    dispatch(updateEvent(updatedEvent, eventId)),
  deleteEvent: (eventId, userId) => dispatch(deleteEvent(eventId, userId))
})

export default connect(null, mapDispatch)(UpdateEvent)
