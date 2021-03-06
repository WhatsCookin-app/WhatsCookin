import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  CreateUser,
  Recipes,
  SingleRecipe,
  Channels,
  VideoSession,
  SearchResults,
  EventsPage,
  BrowseChannels,
  NotFound,
  UserSettings,
  NavCopy,
  MyRecipes,
  VideoSessionCopy
} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <>
        <NavCopy />
        <Route exact path="/login" component={Login} />

        <Switch>
          {/* Routes placed here are available to all visitors */}

          <Route exact path="/signup" component={Signup} />

          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route exact path="/" component={BrowseChannels} />
              <Route exact path="/home" component={Channels} />
              <Route exact path="/home/get-cookin" component={EventsPage} />
              {/* <Route exact path="/home/get-cookin/:roomId" component={VideoSession} /> */}
              <Route
                path="/home/get-cookin/:roomId"
                component={VideoSessionCopy}
              />
              <Route
                exact
                path="/home/channels/:channelId"
                component={Recipes}
              />
              <Route exact path="/home/myRecipes" component={MyRecipes} />
              <Route
                exact
                path="/home/recipes/:recipeId"
                component={SingleRecipe}
              />
              <Route exact path="/channels" component={Channels} />
              <Route exact path="/browse" component={BrowseChannels} />
              <Route exact path="/notFound" component={NotFound} />
              <Route
                exact
                path="/recipes/searchResult"
                component={SearchResults}
              />
              <Route exact path="/editProfile" component={UserSettings} />
            </Switch>
          )}
          {/* Displays our Login component as a fallback */}
          <Route component={Login} />
        </Switch>
      </>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
