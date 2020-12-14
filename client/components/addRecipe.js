import React from 'react'
import {Button, Form} from 'react-bootstrap'
import {connect} from 'react-redux'
import {postRecipe} from '../store/recipe.js'
import {postMyRecipe} from '../store/myRecipe.js'
import axios from 'axios'
import socket from '../socket.js'


class AddRecipe extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      ingredients: '',
      instructions: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleImage = this.handleImage.bind(this)
  }

  componentDidMount() {
    socket.on('new input', inputObj => {
      this.setState({[inputObj.name]: inputObj.value})
    })
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})

    console.log('target name', event.target.name)
    console.log('target value', event.target.value)
    const target = event.target.name
    const value = event.target.value

    socket.emit('change input', {name: target, value: value})
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log('source: ', this.props.source)
    console.log('user: ', this.props.userId)
    if (this.props.source === 'channel') {
      this.props.addRecipe(
        {
          name: this.state.name,
          ingredients: this.state.ingredients,
          instructions: this.state.instructions,
          channels: [this.props.channelId],
          imageUrl: this.state.imageUrl
        },
        this.props.userId,
        this.props.source
      )
    }
    if (this.props.source === 'myRecipes') {
      this.props.addMyRecipe(
        {
          name: this.state.name,
          ingredients: this.state.ingredients,
          instructions: this.state.instructions,
          channels: [this.props.channelId],
          imageUrl: this.state.imageUrl
        },
        this.props.userId
      )
    }

    this.props.close()
  }

  async handleImage() {
    let imageFormObj = new FormData()
    imageFormObj.append('imageData', event.target.files[0])
    const {data} = await axios.post('/api/image/upload', imageFormObj)

    this.setState({imageUrl: data})
  }

  render() {
    return (
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
    addRecipe: newRecipe => dispatch(postRecipe(newRecipe)),
    addMyRecipe: (newRecipe, userId) =>
      dispatch(postMyRecipe(newRecipe, userId))
  }
}

export default connect(mapState, mapDispatch)(AddRecipe)
