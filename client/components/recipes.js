import React from 'react'
import {connect} from 'react-redux'
import {fetchRecipes, postRecipe} from '../store/recipe.js'
import {
  deleteChannel,
  fetchChannel,
  updateChannel
} from '../store/single-channel'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHeart, faPlus} from '@fortawesome/free-solid-svg-icons'
import {Button, Form, Modal, Card} from 'react-bootstrap'
import {SingleChannel, AddRecipe} from './index'

class Recipes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      name: '',
      ingredients: '',
      instructions: ''
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAddRecipe = this.handleAddRecipe.bind(this)
  }
  componentDidMount() {
    this.props.getAllRecipes(this.props.match.params.channelId)
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.addRecipe({
      name: this.state.name,
      ingredients: this.state.ingredients,
      instructions: this.state.instructions,
      channels: [this.props.match.params.channelId]
    })
    this.handleClose()
  }

  handleClose() {
    this.setState({show: false})
  }

  handleAddRecipe() {
    this.setState({show: true})
  }

  render() {
    const recipes = this.props.recipes
    return (
      <div id="all-recipes" className="flex-column">
        <div>
          <SingleChannel
            channelId={this.props.match.params.channelId}
            updateChannel={this.props.updateChannel}
            getChannel={this.props.getChannel}
            channel={this.props.channel}
            deleteChannel={this.props.deleteChannel}
          />
          {/* <FontAwesomeIcon
          icon={faPlus}
          style={{marginLeft: '1200px', color: '#0645AD'}}
          size="lg"
          onClick={() => {
            this.setState({show: true})
          }}
          className="cursor"
        /> */}
          {/* <h6 style={{marginLeft: '1170px', fontSize: 12, color: '#0645AD'}}>
          Add a recipe
        </h6> */}
        </div>
        <div className="d-flex flex-wrap justify-content-center align-items-center ">
          {recipes &&
            recipes.map(element => {
              return (
                <Card
                  key={element.id}
                  className="recipe-card m-2 border-light"
                  bg="transparent"
                >
                  <Link
                    to={`/home/channels/${this.props.match.params.channelId}/${
                      element.id
                    }`}
                  >
                    <Card.Img
                      src={element.imageUrl}
                      className="recipe-image rounded"
                    />
                  </Link>
                  <Link
                    to={`/home/channels/${this.props.match.params.channelId}/${
                      element.id
                    }`}
                    className="text-info mt-1"
                  >
                    <Card.Title>
                      {element.name}{' '}
                      <FontAwesomeIcon
                        icon={faHeart}
                        className="cursor text-danger"
                      />
                      <span className="text-secondary">{element.likes}</span>
                    </Card.Title>
                  </Link>
                  <Card.Text>
                    by {element.owner.firstName} {element.owner.lastName} |{' '}
                    <span className="text-kade font-weight-bold">
                      @{element.owner.userName}
                    </span>{' '}
                  </Card.Text>
                </Card>
              )
            })}
        </div>

        {/* <AddRecipe show={this.state.show} handleClose={this.handleClose} handleSubmit={this.handleSubmit}
        handleChange={this.state.handleChange} name={this.state.name} ingredients={this.state.ingredients} instructions={this.state.instructions}/> */}
        <div id="">
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Upload a Recipe</Modal.Title>
            </Modal.Header>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Recipe Name</Form.Label>
                <Form.Control
                  name="name"
                  type="name"
                  style={{marginLeft: '100px'}}
                  value={this.state.name}
                  onChange={this.handleChange}
                  placeholder="Easy Pancake"
                />
              </Form.Group>
              <Form.Group controlId="ingredients">
                <Form.Label>Ingredients</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="5"
                  name="ingredients"
                  type="ingredients"
                  style={{marginLeft: '100px'}}
                  value={this.state.ingredients}
                  onChange={this.handleChange}
                  placeholder={
                    '1 cup all-purpose flour' +
                    '\n' +
                    '2 tablespoons white sugar' +
                    '\n' +
                    '1 cup milk' +
                    '\n' +
                    '1 egg, beaten' +
                    '\n' +
                    '1 cup milk'
                  }
                />
              </Form.Group>
              <Form.Group controlId="instructions">
                <Form.Label>Instructions</Form.Label>
                <Form.Control
                  name="instructions"
                  type="instructions"
                  value={this.state.instructions}
                  onChange={this.handleChange}
                  as="textarea"
                  rows="10"
                  style={{marginLeft: '100px'}}
                  placeholder={
                    'In a large bowl, mix flour, sugar, baking powder and salt. Make a well in the center, and pour in milk, egg and oil. Mix until smooth.' +
                    '\n' +
                    'Heat a lightly oiled griddle or frying pan over medium high heat. Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each pancake. Brown on both sides and serve hot.'
                  }
                />
              </Form.Group>
              {this.state.name &&
              this.state.ingredients &&
              this.state.instructions ? (
                <Button
                  variant="success"
                  active
                  type="submit"
                  style={{
                    marginLeft: '400px',
                    marginBottom: '30px'
                  }}
                >
                  Upload
                </Button>
              ) : (
                <Button
                  variant="success"
                  disabled
                  type="submit"
                  style={{
                    marginLeft: '400px',
                    marginBottom: '30px'
                  }}
                >
                  Upload
                </Button>
              )}
            </Form>
          </Modal>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    recipes: state.recipe,
    channel: state.singleChannel.channel
  }
}

const mapDispatch = dispatch => {
  return {
    getAllRecipes: channelId => dispatch(fetchRecipes(channelId)),
    addRecipe: newRecipe => dispatch(postRecipe(newRecipe)),
    getChannel: channelId => dispatch(fetchChannel(channelId)),
    updateChannel: channel => dispatch(updateChannel(channel)),
    deleteChannel: channelId => dispatch(deleteChannel(channelId))
  }
}

export default connect(mapState, mapDispatch)(Recipes)
