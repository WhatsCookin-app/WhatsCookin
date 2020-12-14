import React from 'react'
import {connect} from 'react-redux'
import {fetchStateRecipes, fetchResults} from '../store/recipe.js'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {Button, Form, Modal, Card} from 'react-bootstrap'
import {withRouter} from 'react-router'
import searchStr from '../store/searchStr.js'

class SearchResults extends React.Component {
  componentDidMount() {
    console.log('in componentDidMount!')
    console.log('searchStr: ', this.props.searchStr)
    this.props.getResults(this.props.searchStr)
  }
  render() {
    const recipes = this.props.recipes
    console.log('recipes props: ', this.props.recipes)
    if (!recipes.length) {
      return (
        <div className="view d-flex justify-content-center align-items-center">
          <h1>No results for your search, try a different key word</h1>
        </div>
      )
    }
    return (
      <div className="d-flex flex-column view">
        <p className="ml-3 mt-3">
          Showing {recipes.length} {recipes.length > 1 ? 'results:' : 'result:'}
        </p>
        <div className="d-flex flex-wrap justify-content-center align-items-center">
          {recipes.map(element => {
            return (
              <Card
                key={element.id}
                className="search-card m-2 border-light"
                bg="transparent"
              >
                <Link
                  to={{
                    pathname: `/home/recipes/${element.id}`,
                    state: {
                      source: 'search'
                    }
                  }}
                >
                  <Card.Img
                    src={element.imageUrl}
                    className="recipe-image rounded"
                  />
                </Link>

                <Card.Title className="text-info mt-1 mb-0">
                  {element.name}
                </Card.Title>
                <Card.Text className="text-info mb-0">
                  by {element.owner.firstName} {element.owner.lastName} |{' '}
                  <span className="text-kade font-weight-bold">
                    @{element.owner.userName}
                  </span>{' '}
                </Card.Text>
                <Card.Text className="text-info">
                  From the {element.channels[0].name} Channel
                </Card.Text>
              </Card>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    searchStr: state.searchStr,
    recipes: state.recipe
  }
}

const mapDispatch = dispatch => {
  return {
    // getStateRecipes: () => dispatch(fetchStateRecipes()),
    getResults: str => dispatch(fetchResults(str))
  }
}

export default withRouter(connect(mapState, mapDispatch)(SearchResults))
