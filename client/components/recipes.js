import React from 'react'
import {connect} from 'react-redux'
import {fetchRecipes} from '../store/recipe.js'
import {Link} from 'react-router-dom'

class Recipes extends React.Component {
  componentDidMount() {
    this.props.getAllRecipes(this.props.match.params.channelId)
  }

  render() {
    const recipes = this.props.recipes
    return (
      <div id="all-recipes">
        {recipes &&
          recipes.map(element => {
            return (
              <div key={element.id} id="single-recipe">
                <img src={element.imageUrl} id="img" />
                <div id="recipe-info">
                  <Link
                    to={`/home/channels/${this.props.match.params.channelId}/${
                      this.props.match.params.recipeId
                    }`}
                  >
                    {element.name}
                  </Link>
                </div>
              </div>
            )
          })}
      </div>
    )
  }
}

const mapState = state => {
  return {
    recipes: state.recipe
  }
}

const mapDispatch = dispatch => {
  return {
    getAllRecipes: channelId => dispatch(fetchRecipes(channelId))
  }
}

export default connect(mapState, mapDispatch)(Recipes)
