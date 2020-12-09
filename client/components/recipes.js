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
import {faHeart} from '@fortawesome/free-solid-svg-icons'
import {Button, Form, Modal, Card} from 'react-bootstrap'
import {SingleChannel, AddRecipe} from './index'
import axios from 'axios'

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
    this.handleImage = this.handleImage.bind(this)
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
      channels: [this.props.match.params.channelId],
      imageUrl: this.state.imageUrl
    })
    this.handleClose()
  }

  handleClose() {
    this.setState({show: false})
  }

  handleAddRecipe() {
    this.setState({show: true})
  }

  async handleImage() {
    let imageFormObj = new FormData()
    imageFormObj.append('imageData', event.target.files[0])
    const {data} = await axios.post('/api/image/upload', imageFormObj)

    this.setState({imageUrl: data})
  }

  render() {
    const recipes = this.props.recipes
    return (
      <div id="all-recipes" className="flex-column vieww">
        <div>
          <SingleChannel
            channelId={this.props.match.params.channelId}
            updateChannel={this.props.updateChannel}
            getChannel={this.props.getChannel}
            channel={this.props.channel}
            deleteChannel={this.props.deleteChannel}
            handleAddRecipe={this.handleAddRecipe}
          />
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

        <div>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Upload a Recipe</Modal.Title>
            </Modal.Header>
            <Form onSubmit={this.handleSubmit} className="d-flex flex-column">
              <Form.Group controlId="name" className="mb-0">
                <Form.Label>Recipe Name</Form.Label>
                <Form.Control
                  name="name"
                  type="name"
                  // style={{marginLeft: '100px'}}
                  value={this.state.name}
                  onChange={this.handleChange}
                  placeholder="Easy Pancake"
                  className="mb-1 mt-1"
                />
              </Form.Group>
              <Form.Group controlId="ingredients" className="mb-1 mt-1">
                <Form.Label>Ingredients</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="5"
                  name="ingredients"
                  type="ingredients"
                  // style={{marginLeft: '100px'}}
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
                {/* <br /> */}
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
                  placeholder={
                    'In a large bowl, mix flour, sugar, baking powder and salt. Make a well in the center, and pour in milk, egg and oil. Mix until smooth.' +
                    '\n' +
                    'Heat a lightly oiled griddle or frying pan over medium high heat. Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each pancake. Brown on both sides and serve hot.'
                  }
                />
              </Form.Group>
              <Form.Group controlId="imageUrl" className="mb-1 mt-1">
                <Form.Label>Recipe Image</Form.Label>
                <br />
                <Form.File
                  id="imageUpload"
                  name="imageUrl"
                  className="m-0 mb-1"
                  onChange={this.handleImage}
                />
                <br />{' '}
              </Form.Group>
              {this.state.name &&
              this.state.ingredients &&
              this.state.instructions ? (
                <div className="d-flex justify-content-end mt-1">
                  <Button variant="success" active type="submit">
                    Upload
                  </Button>
                </div>
              ) : (
                <div className="d-flex justify-content-end mt-1">
                  <Button variant="success" disabled type="submit">
                    Upload
                  </Button>
                </div>
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
