import React, {Component} from 'react'
import {connect} from 'react-redux'
import {auth} from '../store'
import UploadImage from './UploadImage'
import {Button} from 'react-bootstrap'
import {Form} from 'react-bootstrap'

class CreateUser extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      profilePicture: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setProfilePicture = this.setProfilePicture.bind(this)
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  async handleSubmit(evt) {
    try {
      evt.preventDefault()
      const newUserObj = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        userName: this.state.userName,
        email: this.state.email,
        password: this.state.password,
        profilePicture: this.state.profilePicture
      }
      await this.props.auth({...newUserObj, method: 'signup'})
    } catch (err) {
      console.error(err)
    }
  }
  setProfilePicture(path) {
    this.setState({
      profilePicture: path
    })
  }

  render() {
    const {error} = this.props
    return (
      <Form>
        <Form.Group
          controlId="formBasicEmail"
          className="view"
          onChange={this.handleChange}
          name="signup"
        >
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email" type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            name="firstName"
            type="firstName"
            placeholder="First Name"
          />
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            name="lastName"
            type="lastName"
            placeholder="Last Name"
          />
        </Form.Group>
        <Form.Group controlId="userName">
          <Form.Label>User Name </Form.Label>
          <Form.Control
            name="userName"
            type="userName"
            placeholder="User Name"
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password </Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group controlId="Upload Image">
          <Form.Label>Profile Picture </Form.Label>
          <UploadImage setImageUrl={this.setProfilePicture} />
        </Form.Group>
        <div>
          <Button type="submit" onClick={this.handleSubmit}>
            Sign Up
          </Button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
        <a href="/auth/google" className="text-kade">
          Sign Up with Google
        </a>
        <p>
          Already have an account?{' '}
          <a href="/login" className="text-kade">
            Login here!
          </a>
        </p>
      </Form>
    )
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    id: state.user.id,
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    auth: userObj => dispatch(auth(userObj, userObj.method))
  }
}

export default connect(mapSignup, mapDispatch)(CreateUser)
