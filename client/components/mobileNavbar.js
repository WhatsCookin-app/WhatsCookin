import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import {logout} from '../store'
import {CreateUser} from './CreateUser'
import {Navbar as BootstrapNavbar, NavDropdown, Modal} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch, faBars} from '@fortawesome/free-solid-svg-icons'
import {withRouter} from 'react-router'
import check from '../mobileCheck'
import MobileSearch from './mobileSearch'

window.mobileCheck = check

class NavCopy extends Component {
  constructor() {
    super()
    this.state = {
      show: false
    }
    this.handleClose = this.handleClose.bind(this)
  }

  handleClose() {
    this.setState({show: false})
  }

  render() {
    return (
      <div id="nav-top">
        <BootstrapNavbar
          bg="navbar"
          className="border-bottom justify-content-between shadow-sm"
          expand="sm"
          sticky="top"
        >
          <BootstrapNavbar.Brand href="/home" className="m-0">
            <img
              src="/img/brand-white.png"
              width="150"
              // height="30"
              className=""
              alt="React Bootstrap logo"
            />
          </BootstrapNavbar.Brand>
          <div className="d-flex flex-wrap align-items-center">
            <NavDropdown
              title={
                <FontAwesomeIcon icon={faBars} className="mr-3 text-white" />
              }
              id="mobile-drop"
            >
              <Link to="/channels" id="my-channels">
                My Channels
              </Link>
              <Link to="/browse" id="browse">
                Browse
              </Link>
              <Link to="/home/get-cookin" id="live-cooking">
                Live Cooking
              </Link>
              <Link to="/home/myRecipes" id="my-recipes">
                My Recipes
              </Link>
              <Link to="/editProfile" id="edit-profile">
                Edit Profile
              </Link>
              <Link to="/" onClick={this.props.handleClick} id="logout">
                Logout
              </Link>
            </NavDropdown>
            <FontAwesomeIcon
              icon={faSearch}
              variant="outline-light"
              onClick={() => this.setState({show: true})}
              className="text-white"
            />
          </div>
        </BootstrapNavbar>
        <div>
          <Modal show={this.state.show} onHide={() => this.handleClose()}>
            <Modal.Header closeButton>
              <Modal.Title>Search for Recipes</Modal.Title>
            </Modal.Header>
            <MobileSearch close={this.handleClose} />
          </Modal>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    recipes: state.recipe,
    searchStr: state.searchStr
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(NavCopy))

/**
 * PROP TYPES
 */
NavCopy.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
