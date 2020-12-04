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
import {Button, Form, Modal} from 'react-bootstrap'
import NotFound from './notFound'
import channel from '../store/channel.js'

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
      likes: 0,
      show: false
    }
    this.handleClose = this.handleClose.bind(this)
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

  handleClose() {
    this.setState({
      show: false,
      nameEdit: false,
      ingredientEdit: false,
      instructionEdit: false
    })
  }

  async handleClick() {
    const newLikes = this.state.likes + 1
    this.setState({likes: newLikes})
    await this.props.updateRecipe(this.props.match.params.recipeId, {
      likes: newLikes
    })
  }

  handleDelete() {
    this.handleClose()
    this.props.removeRecipe(
      this.props.match.params.recipeId,
      this.props.match.params.channelId
    )
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
    const {loading} = this.props
    if (loading) {
      return (
        <div>
          <Loader type="Rings" color="#00BFFF" height={80} width={80} />
        </div>
      )
    }
    return (
      <div className="m-3">
        <div id="editButton">
          <h5 className="headline">
            {this.props.singleRecipe.name}&nbsp;&nbsp;
          </h5>
          {this.props.user.id &&
          this.props.user.id === this.props.singleRecipe.ownerId ? (
            <FontAwesomeIcon
              icon={faEdit}
              style={{color: 'blue'}}
              onClick={() => {
                this.setState({nameEdit: true})
              }}
            />
          ) : (
            <FontAwesomeIcon icon={faEdit} style={{color: 'grey'}} />
          )}
        </div>
        <Modal show={this.state.nameEdit} onHide={this.handleClose}>
          <Modal.Header closeButton />
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Recipe Name</Form.Label>
              <Form.Control
                name="name"
                type="name"
                style={{marginLeft: '100px'}}
                value={this.state.name}
                onChange={event => this.handleChange(event)}
              />
            </Form.Group>
          </Form>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleSubmitName}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
        <div id="editButton">
          <i
            className="fas fa-heart"
            style={{color: 'red'}}
            onClick={this.handleClick}
          />

          <h5 className="authorline">
            &nbsp;likes:{this.state.likes}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </h5>

          <h5 className="authorline">
            Recipe created by: {this.props.singleRecipe.owner.userName}
          </h5>
        </div>
        <img src={this.props.singleRecipe.imageUrl} id="img" />

        <div>
          <div>
            <div id="editButton">
              <h5 className="section-headline">Ingredients:&nbsp;&nbsp;</h5>
              {this.props.user.id &&
              this.props.user.id === this.props.singleRecipe.ownerId ? (
                <FontAwesomeIcon
                  icon={faEdit}
                  style={{color: 'blue'}}
                  onClick={() => {
                    this.setState({ingredientEdit: true})
                  }}
                />
              ) : (
                <FontAwesomeIcon icon={faEdit} style={{color: 'grey'}} />
              )}
            </div>
            <h5>
              {this.props.singleRecipe.ingredients
                .split('\n')
                .map((elm, index) => {
                  return (
                    <div id="editButton">
                      <Form.Check aria-label="option 1" key={index} />
                      <p className="item-text">{elm}</p>
                    </div>
                  )
                })}
            </h5>
          </div>
          <Modal show={this.state.ingredientEdit} onHide={this.handleClose}>
            <Modal.Header closeButton />
            <Form>
              <Form.Group controlId="ingredients">
                <Form.Label>Ingredients</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="10"
                  name="ingredients"
                  type="ingredients"
                  style={{marginLeft: '100px'}}
                  value={this.state.ingredients}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form>
            <Modal.Footer>
              <Button variant="primary" onClick={this.handleSubmitIngredients}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div>
          <div id="editButton">
            <h5 className="section-headline">Instructions:&nbsp;&nbsp;</h5>
            {this.props.user.id &&
            this.props.user.id === this.props.singleRecipe.ownerId ? (
              <FontAwesomeIcon
                icon={faEdit}
                style={{color: 'blue'}}
                onClick={() => {
                  this.setState({instructionEdit: true})
                }}
              />
            ) : (
              <FontAwesomeIcon icon={faEdit} style={{color: 'grey'}} />
            )}
          </div>
          <h5>
            {this.props.singleRecipe.instructions
              .split('\n')
              .map((elm, index) => {
                return (
                  <li key={index} className="item-text">
                    {elm}
                  </li>
                )
              })}
          </h5>
        </div>
        <Modal show={this.state.instructionEdit} onHide={this.handleClose}>
          <Modal.Header closeButton />
          <Form>
            <Form.Group controlId="instructions">
              <Form.Label>Instructions</Form.Label>
              <Form.Control
                as="textarea"
                rows="10"
                name="instructions"
                type="instructions"
                style={{marginLeft: '100px'}}
                value={this.state.instructions}
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleSubmitInstructions}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
        {this.props.user.id &&
        this.props.user.id === this.props.singleRecipe.ownerId ? (
          <Button
            variant="danger"
            type="submit"
            size="sm"
            onClick={() => {
              this.setState({show: true})
            }}
          >
            Delete recipe
          </Button>
        ) : (
          <Button variant="danger" type="submit" size="sm" disabled>
            Delete recipe
          </Button>
        )}
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title />
          </Modal.Header>

          <Modal.Body>
            <p>Are you sure you want to delete this recipe?</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary">Cancel</Button>
            <Button variant="primary" onClick={this.handleDelete}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
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
    removeRecipe: (recipeId, channelId) =>
      dispatch(deleteRecipe(recipeId, channelId))
  }
}

export default connect(mapState, mapDispatch)(SingleRecipe)
