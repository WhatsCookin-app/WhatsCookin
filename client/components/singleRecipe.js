/*eslint-disable */
// ^^^^ TAKE OUT

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  fetchOneRecipe,
  loadingRecipe,
  updateSingleRecipe
} from '../store/singleRecipe.js'
import Loader from 'react-loader-spinner'

class SingleRecipe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nameEdit: false,
      ingredientEdit: false,
      instructionEdit: false,
      name: '',
      ingredients: '',
      instructions: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmitName = this.handleSubmitName.bind(this)
    this.handleSubmitIngredients = this.handleSubmitIngredients.bind(this)
    this.handleSubmitInstructions = this.handleSubmitInstructions.bind(this)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  async handleSubmitName(event) {
    event.preventDefault()
    await this.props.updateRecipe(this.props.match.params.recipeId, {
      name: this.state.name
    })
    this.setState({nameEdit: false})
  }

  async handleSubmitIngredients(event) {
    event.preventDefault()
    await this.props.updateRecipe(this.props.match.params.recipeId, {
      ingredients: this.state.ingredients
    })
    this.setState({ingredientEdit: false})
  }

  async handleSubmitInstructions(event) {
    event.preventDefault()
    await this.props.updateRecipe(this.props.match.params.recipeId, {
      instructions: this.state.instructions
    })
    this.setState({instructionEdit: false})
  }

  async componentDidMount() {
    await this.props.getOneRecipe(
      this.props.match.params.channelId,
      this.props.match.params.recipeId
    )
    this.setState({
      name: this.props.singleRecipe.name,
      ingredients: this.props.singleRecipe.ingredients,
      instructions: this.props.singleRecipe.instructions
    })
  }

  componentWillUnmount() {
    this.props.changeLoadingState()
  }

  render() {
    const {loading} = this.props
    if (loading) {
      return (
        <div>
          <Loader type="Rings" color="#00BFFF" height={80} width={80} />
        </div>
      )
    }
    return (
      <div>
        <img src={this.props.singleRecipe.imageUrl} />

        {!this.state.nameEdit ? (
          <div>
            <h5>Recipe Name: {this.props.singleRecipe.name}</h5>

            <button
              onClick={() => {
                this.setState({nameEdit: true})
              }}
            >
              Edit
            </button>
          </div>
        ) : (
          <form onSubmit={this.handleSubmitName}>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={event => this.handleChange(event)}
            />
            <button type="submit">Save</button>
          </form>
        )}
        <div>
          {!this.state.ingredientEdit ? (
            <div>
              <h5>Ingredients: {this.props.singleRecipe.ingredients}</h5>
              <button
                onClick={() => {
                  this.setState({ingredientEdit: true})
                }}
              >
                Edit
              </button>
            </div>
          ) : (
            <form onSubmit={this.handleSubmitIngredients}>
              <input
                type="text"
                style={{width: '370px', height: '300px'}}
                name="ingredients"
                value={this.state.ingredients}
                onChange={event => this.handleChange(event)}
              />
              <button type="submit">Save</button>
            </form>
          )}
        </div>

        {!this.state.instructionEdit ? (
          <div>
            <h5>Instructions: {this.props.singleRecipe.instructions}</h5>
            <button
              onClick={() => {
                this.setState({instructionEdit: true})
              }}
            >
              Edit
            </button>
          </div>
        ) : (
          <form onSubmit={this.handleSubmitInstructions}>
            <input
              type="text"
              name="instructions"
              style={{width: '370px', height: '500px'}}
              value={this.state.instructions}
              onChange={event => this.handleChange(event)}
            />
            <button type="submit">Save</button>
          </form>
        )}

        <h5>Likes: {this.props.singleRecipe.likes}</h5>
        <h5>Recipe created by: {this.props.singleRecipe.owner.userName}</h5>
      </div>
    )
  }
}

const mapState = state => {
  return {
    singleRecipe: state.singleRecipe.recipe,
    loading: state.singleRecipe.loading
  }
}

const mapDispatch = dispatch => {
  return {
    getOneRecipe: (channelId, recipeId) =>
      dispatch(fetchOneRecipe(channelId, recipeId)),
    changeLoadingState: () => dispatch(loadingRecipe()),
    updateRecipe: (recipeId, recipe) =>
      dispatch(updateSingleRecipe(recipeId, recipe))
  }
}

export default connect(mapState, mapDispatch)(SingleRecipe)
