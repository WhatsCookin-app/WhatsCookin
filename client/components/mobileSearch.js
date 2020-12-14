import React from 'react'
import {connect} from 'react-redux'
import {Form, FormControl, Button} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {fetchResults} from '../store/recipe.js'
import {getSearchStr} from '../store/searchStr'
import {withRouter} from 'react-router-dom'

class MobileSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      keyWord: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleChange(event) {
    this.setState({keyWord: event.target.value})
  }

  handleSearch() {
    this.props.fetchSearch(this.state.keyWord)
    this.props.getResults(this.state.keyWord)

    this.props.history.push({
      pathname: '/recipes/searchResult',
      state: {searchStr: this.state.keyWord}
    })
    this.setState({keyWord: ''})
    this.props.close()
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
      this.props.close()
    }
  }

  render() {
    return (
      <Form>
        <FormControl
          type="text"
          placeholder="Search for a recipe"
          value={this.state.keyWord}
          // id="small"
          // className="mr-sm-2 bg-light"
          onChange={event => this.handleChange(event)}
          onKeyDown={this.handleKeyPress}
        />
        <div className="d-flex justify-content-end">
          {this.state.keyWord === '' ? (
            <Button variant="success" type="button">
              Search
            </Button>
          ) : (
            <Button
              variant="success"
              type="button"
              onClick={() => {
                this.handleSearch()
              }}
            >
              Search
            </Button>
          )}
        </div>
      </Form>
    )
  }
}

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
    },
    getResults: searchStr => dispatch(fetchResults(searchStr)),
    fetchSearch: searchStr => dispatch(getSearchStr(searchStr))
  }
}

export default withRouter(connect(mapState, mapDispatch)(MobileSearch))
