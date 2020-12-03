/*eslint-disable */
// ^^^^ TAKE OUT

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  fetchOneRecipe,
  loadingRecipe,
  updateSingleRecipe,
  deleteRecipe
} from '../store/singleRecipe.js'
import Loader from 'react-loader-spinner'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit} from '@fortawesome/free-solid-svg-icons'
import {Button, Form} from 'react-bootstrap'
import NotFound from './notFound'

class SingleRecipe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nameEdit: false,
      ingredientEdit: false,
      instructionEdit: false,
      name: '',
      ingredients: '',
      instructions: '',
      likes: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleSubmitName = this.handleSubmitName.bind(this)
    this.handleSubmitIngredients = this.handleSubmitIngredients.bind(this)
    this.handleSubmitInstructions = this.handleSubmitInstructions.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  async handleClick() {
    const newLikes = this.state.likes + 1
    this.setState({likes: newLikes})
    await this.props.updateRecipe(this.props.match.params.recipeId, {
      likes: newLikes
    })
  }

  handleDelete() {
    this.props.removeRecipe(this.props.match.params.recipeId)
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
      instructions: this.props.singleRecipe.instructions,
      likes: this.props.singleRecipe.likes
    })
  }

  componentWillUnmount() {
    this.props.changeLoadingState()
  }

  render() {
    console.log('recipe: ', this.props.singleRecipe)
    const {loading} = this.props
    if (loading) {
      return (
        <div>
          <Loader type="Rings" color="#00BFFF" height={80} width={80} />
        </div>
      )
    }
    if (!this.props.singleRecipe.id) {
      return <NotFound />
    }
    return (
      <div className="m-3">
        <img src={this.props.singleRecipe.imageUrl} />

        {!this.state.nameEdit ? (
          <div>
            <h5>Recipe Name: {this.props.singleRecipe.name}</h5>
            {this.props.user.id &&
            this.props.user.id === this.props.singleRecipe.ownerId ? (
              <FontAwesomeIcon
                icon={faEdit}
                onClick={() => {
                  this.setState({nameEdit: true})
                }}
              />
            ) : (
              <FontAwesomeIcon icon={faEdit} style={{color: 'grey'}} />
            )}
          </div>
        ) : (
          <form onSubmit={this.handleSubmitName}>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={event => this.handleChange(event)}
            />
            <Button variant="primary" type="submit" size="sm">
              Save
            </Button>
          </form>
        )}
        <div>
          {!this.state.ingredientEdit ? (
            <div>
              <h5>Ingredients:</h5>
              <h5>
                {this.props.singleRecipe.ingredients
                  .split('\n')
                  .map((elm, index) => {
                    return <li key={index}>{elm}</li>
                  })}
              </h5>
              {this.props.user.id &&
              this.props.user.id === this.props.singleRecipe.ownerId ? (
                <FontAwesomeIcon
                  icon={faEdit}
                  onClick={() => {
                    this.setState({ingredientEdit: true})
                  }}
                />
              ) : (
                <FontAwesomeIcon icon={faEdit} style={{color: 'grey'}} />
              )}
            </div>
          ) : (
            <form onSubmit={this.handleSubmitIngredients}>
              <textarea
                style={{width: '370px', height: '300px'}}
                name="ingredients"
                value={this.state.ingredients}
                onChange={event => this.handleChange(event)}
              />
              <Button variant="primary" type="submit">
                Save
              </Button>
            </form>
          )}
        </div>
        {!this.state.instructionEdit ? (
          <div>
            <h5>Instructions:</h5>
            <h5>
              {' '}
              {this.props.singleRecipe.instructions
                .split('\n')
                .map((elm, index) => {
                  return <li key={index}>{elm}</li>
                })}
            </h5>
            {this.props.user.id &&
            this.props.user.id === this.props.singleRecipe.ownerId ? (
              <FontAwesomeIcon
                icon={faEdit}
                onClick={() => {
                  this.setState({instructionEdit: true})
                }}
              />
            ) : (
              <FontAwesomeIcon icon={faEdit} style={{color: 'grey'}} />
            )}
          </div>
        ) : (
          <form onSubmit={this.handleSubmitInstructions}>
            <textarea
              name="instructions"
              style={{width: '370px', height: '500px'}}
              value={this.state.instructions}
              onChange={event => this.handleChange(event)}
            />
            <Button variant="primary" type="submit">
              Save
            </Button>
          </form>
        )}

        <h5>likes: {this.state.likes}</h5>
        <i
          className="fas fa-heart"
          style={{color: 'red'}}
          onClick={this.handleClick}
        />
        <h5>Recipe created by: {this.props.singleRecipe.owner.userName}</h5>
        <Button variant="primary" type="submit" onClick={this.handleDelete}>
          Delete recipe
        </Button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    singleRecipe: state.singleRecipe.recipe,
    loading: state.singleRecipe.loading,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getOneRecipe: (channelId, recipeId) =>
      dispatch(fetchOneRecipe(channelId, recipeId)),
    changeLoadingState: () => dispatch(loadingRecipe()),
    updateRecipe: (recipeId, recipe) =>
      dispatch(updateSingleRecipe(recipeId, recipe)),
    removeRecipe: recipeId => dispatch(deleteRecipe(recipeId))
  }
}

export default connect(mapState, mapDispatch)(SingleRecipe)
