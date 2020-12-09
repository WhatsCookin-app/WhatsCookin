import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {CreateUser} from './CreateUser'
import {
  Navbar as BootstrapNavbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavItem
} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'

class NavCopy extends Component {
  constructor() {
    super()
    this.state = {
      search: false,
      keyWord: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({keyWord: event.target.value})
  }

  render() {
    console.log('keyword: ', this.state.keyWord)
    return (
      <div id="nav-top">
        <BootstrapNavbar
          bg="info"
          className="border-bottom justify-content-between shadow-sm rounded"
          expand="sm"
        >
          <BootstrapNavbar.Brand href="/home">
            WhatsCookin
          </BootstrapNavbar.Brand>
          {/* <Nav> */}
          {this.props.isLoggedIn ? (
            <Nav>
              {/* The navbar will show these links after you log in */}
              <Nav.Item>
                <Link to="/home" bg="kade">
                  Home
                </Link>
              </Nav.Item>
              <Link to="/editProfile">
                <Nav.Item>Edit Profile</Nav.Item>
              </Link>

              <Link to="/channels">
                <Nav.Item>Channels</Nav.Item>
              </Link>
              <Link to="/home/get-cookin">
                <Nav.Item>GetCookin</Nav.Item>
              </Link>

              <Link to="/" onClick={this.props.handleClick}>
                Logout
              </Link>
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2 bg-light"
                  onChange={event => this.handleChange(event)}
                />
                {this.state.keyWord === '' ? (
                  <Button variant="outline-kade">
                    <FontAwesomeIcon icon={faSearch} />
                  </Button>
                ) : (
                  <Link
                    to={{
                      pathname: '/notFound',
                      state: {
                        check: false
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </Link>
                )}
              </Form>
            </Nav>
          ) : (
            <Nav>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </Nav>
          )}
          {/* </Nav> */}
          {/* <hr /> */}
        </BootstrapNavbar>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(NavCopy)

/**
 * PROP TYPES
 */
NavCopy.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
