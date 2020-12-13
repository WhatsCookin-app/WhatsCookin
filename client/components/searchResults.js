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
      return <h1>No results for your search, try a different key word</h1>
    }
    return (
      <div className="d-flex flex-wrap justify-content-center align-items-center view">
        {recipes &&
          recipes.map(element => {
            return (
              <Card
                key={element.id}
                className="recipe-card m-2 border-light"
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
                  <Card.Title className="text-info mt-1">
                    {element.name}
                  </Card.Title>
                </Link>
              </Card>
            )
          })}
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
    getResults: searchStr => dispatch(fetchResults(searchStr))
  }
}

export default withRouter(connect(mapState, mapDispatch)(SearchResults))
