import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import axios from 'axios'
import {Form} from 'react-bootstrap'
import {Button} from 'react-bootstrap'

const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <div className="area">
        <ul className="circles">
          <li>
            <img src="/img/carrot.png" />
          </li>
          <li>
            <img src="/img/chicken.png" />
          </li>
          <li>
            <img src="/img/kale.png" />
          </li>
          <li>
            <img src="/img/pasta.png" />
          </li>
          <li>
            <img src="/img/pizza.png" />
          </li>
          <li>
            <img src="/img/taco.png" />
          </li>
        </ul>
      </div>

      <img className="logo" src="/img/logo.png" height="200" width="200" />

      <Form onSubmit={handleSubmit} name={name} className="context">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email" type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password </Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <div>
          <Button type="submit">{displayName}</Button>
          <Button
            type="button"
            onClick={async () => {
              try {
                const email = document.getElementById('email').value
                await axios.post('/api/users/forgotpassword', {
                  email
                })
                alert('Email Sent')
              } catch (error) {
                alert('No such email found')
              }
            }}
          >
            Forgot Password
          </Button>
          <div>
            <a href="/auth/google" className="text-kade">
              {displayName} with Google
            </a>
          </div>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </Form>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const method = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth({email, password, method}))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
