import React from 'react'
import {connect} from 'react-redux'
import {fetchStateRecipes, fetchResults} from '../store/recipe.js'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {Button, Form, Modal} from 'react-bootstrap'
import {withRouter} from 'react-router'

class SearchResults extends React.Component {
  // constructor() {
  //   super()
  //   this.state = {
  //     searchstr: ''
  //   }
  // }
  componentDidMount() {
    // this.setState({searchStr: this.props.location.state.searchStr})
    console.log('in componentDidMount!')
    this.props.getResults(this.props.searchStr)
  }
  render() {
    // const recipes = this.state.recipes
    const recipes = this.props.recipes
    // console.log('history searchstr: ',this.props.history.location.state.searchStr)
    console.log('recipes props: ', this.props.recipes)
    // console.log('recipes state: ', this.state.recipes)
    if (!recipes.length) {
      return <h1>No results for your search, try a different key word</h1>
    }
    return (
      <div>
        {recipes &&
          recipes.map(element => {
            return (
              <div key={element.id} id="single-recipe">
                <Link
                  to={{
                    pathname: `/home/recipes/${element.id}`,
                    state: {
                      source: 'search'
                    }
                  }}
                >
                  <img src={element.imageUrl} id="img" />
                  <div id="recipe-info">{element.name}</div>
                </Link>
              </div>
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
