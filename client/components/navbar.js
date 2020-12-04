import React from 'react'
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

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <BootstrapNavbar
      bg="info"
      className="border-bottom justify-content-between shadow-sm rounded"
      expand="sm"
    >
      <BootstrapNavbar.Brand href="/home">WhatsCookin</BootstrapNavbar.Brand>
      {/* <Nav> */}
      {isLoggedIn ? (
        <Nav>
          {/* The navbar will show these links after you log in */}
          <Nav.Item>
            <Link to="/home" bg="kade">
              Home
            </Link>
          </Nav.Item>

          <Link to="/channels">
            <Nav.Item>Channels</Nav.Item>
          </Link>
          <Link to="/getCookin">
            <Nav.Item>GetCookin</Nav.Item>
          </Link>

          <Link to="/" onClick={handleClick}>
            Logout
          </Link>
          <Form inline>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2 bg-light"
            />
            <Button variant="outline-kade">
              <FontAwesomeIcon icon={faSearch} />
            </Button>
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

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
