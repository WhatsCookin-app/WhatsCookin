import React, {Component} from 'react'
import {connect} from 'react-redux'
import {postUser} from '../store/user'
import {auth} from '../store'

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
      //await this.props.sendUserToPost(newUserObj)
      await this.props.auth({...newUserObj, method: 'signup'})
      // this.props.auth(newUserObj.email, newUserObj.password, 'signup')
      this.setState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        profilePicture: ''
      })
      // redirect to My Account view
      // this.history.push(`/myaccount`)
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const {name, error} = this.props
    return (
      <div className="sign-up">
        <form
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          name={name}
        >
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" />
          </div>
          <div>
            <label htmlFor="firstName">
              <small>First Name</small>
            </label>
            <input name="firstName" type="text" />
          </div>
          <div>
            <label htmlFor="lastName">
              <small>Last Name</small>
            </label>
            <input name="lastName" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          <div>
            <label htmlFor="profilePicture">
              <small>Profile Picture</small>
            </label>
            <input type="file" id="myFile" name="profilePicture" />
          </div>
          <div>
            <label htmlFor="userName">
              <small>User Name</small>
            </label>
            <input name="userName" type="text" />
          </div>
          <div>
            <button type="submit">Sign Up</button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        <a href="/auth/google" className="text-kade">
          Sign Up with Google
        </a>
        <p>
          Already have an account?{' '}
          <a href="/login" className="text-kade">
            Login here!
          </a>
        </p>
      </div>
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
    sendUserToPost: userObj => dispatch(postUser(userObj)),
    auth: userObj => dispatch(auth(userObj, userObj.method))
  }
}

export default connect(mapSignup, mapDispatch)(CreateUser)
