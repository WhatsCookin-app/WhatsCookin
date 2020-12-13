import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import {logout} from '../store'
import {fetchResults} from '../store/recipe.js'
import {getSearchStr} from '../store/searchStr'
import {CreateUser} from './CreateUser'
import {
  Navbar as BootstrapNavbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
  NavItem
} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCog, faSearch} from '@fortawesome/free-solid-svg-icons'
import {withRouter} from 'react-router'
import check from '../mobileCheck'
import MobileNavbar from './mobileNavbar'

window.mobileCheck = check

class NavCopy extends Component {
  constructor() {
    super()
    this.state = {
      keyWord: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClickSearch = this.handleClickSearch.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  handleChange(event) {
    this.setState({keyWord: event.target.value})
  }
  handleClickSearch() {
    this.props.fetchSearch(this.state.keyWord)
    this.props.getResults(this.state.keyWord)
    // this.props.history.push('/recipes/searchResult')
    this.props.history.push({
      pathname: '/recipes/searchResult',
      state: {searchStr: this.state.keyWord}
    })
    this.setState({keyWord: ''})
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      this.props.fetchSearch(this.state.keyWord)
      this.props.getResults(this.state.keyWord)
      this.props.history.push({
        pathname: '/recipes/searchResult',
        state: {searchStr: this.state.keyWord}
      })
      this.setState({keyWord: ''})
    }
  }

  render() {
    const path = this.props.location.pathname
    console.log('keyword: ', this.state.keyWord)
    if (this.props.videos.myVideo && this.props.videos.myVideo.id)
      return <div />

    if (check()) return <MobileNavbar />
    return (
      <div id="nav-top">
        <BootstrapNavbar
          bg="navbar"
          className="border-bottom justify-content-between shadow-sm"
          expand="sm"
          style={
            path === '/login' || path === '/'
              ? {position: 'absolute', top: 0, zIndex: 9999, width: '100%'}
              : {}
          }
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
          {this.props.isLoggedIn ? (
            <Nav className="d-flex justify-content-center align-items-center">
              {/* The navbar will show these links after you log in */}
              <NavDropdown title="Profile" id="profile-dropdown">
                <Link to="/editProfile" id="edit-profile">
                  Edit Profile
                </Link>
                <Link to="/" onClick={this.props.handleClick} id="logout">
                  Logout
                </Link>
              </NavDropdown>
              <NavDropdown title="Channels" id="channels-dropdown">
                <Link to="/channels" id="my-channels">
                  My Channels
                </Link>
                <Link to="/browse" id="browse">
                  Browse
                </Link>
              </NavDropdown>

              <Link to="/home/get-cookin">Live Cooking</Link>

              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Search for a recipe"
                  value={this.state.keyWord}
                  id="small"
                  className="mr-sm-2 bg-light"
                  onChange={event => this.handleChange(event)}
                  onKeyDown={this.handleKeyPress}
                />
                {this.state.keyWord === '' ? (
                  <Button variant="outline-light">
                    <FontAwesomeIcon icon={faSearch} />
                  </Button>
                ) : (
                  <Button
                    variant="outline-light"
                    onClick={() => {
                      this.handleClickSearch()
                    }}
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </Button>
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
    isLoggedIn: !!state.user.id,
    recipes: state.recipe,
    searchStr: state.searchStr,
    videos: state.videos
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    getResults: searchStr => dispatch(fetchResults(searchStr)),
    fetchSearch: searchStr => dispatch(getSearchStr(searchStr))
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
