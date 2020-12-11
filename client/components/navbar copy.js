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
  NavItem
} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCog, faSearch} from '@fortawesome/free-solid-svg-icons'
import {withRouter} from 'react-router'

class NavCopy extends Component {
  constructor() {
    super()
    this.state = {
      keyWord: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClickSearch.bind(this)
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
      // this.props.history.push('/recipes/searchResult')
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
    return (
      <div id="nav-top">
        <BootstrapNavbar
          bg="info"
          className="border-bottom justify-content-between shadow-sm"
          expand="sm"
          style={
            path === '/login' || path === '/'
              ? {position: 'absolute', top: 0, zIndex: 9999, width: '100%'}
              : {}
          }
        >
          <BootstrapNavbar.Brand href="/home" />
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
                <FontAwesomeIcon
                  icon={faCog}
                  className="fas fa-cog"
                  size="1x"
                />
                <Nav.Item />
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
                  placeholder="Search for a recipe"
                  value={this.state.keyWord}
                  className="mr-sm-2 bg-light"
                  onChange={event => this.handleChange(event)}
                  onKeyDown={this.handleKeyPress}
                />
                {this.state.keyWord === '' ? (
                  <Button variant="outline-kade">
                    <FontAwesomeIcon icon={faSearch} />
                  </Button>
                ) : (
                  <Button
                    variant="outline-kade"
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
