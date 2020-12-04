import React from 'react'
import {connect} from 'react-redux'
import {fetchRecipes} from '../store/recipe.js'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {Button, Form, Modal} from 'react-bootstrap'
import {SingleChannel} from './index'

class Recipes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
    this.handleClose = this.handleClose.bind(this)
  }
  componentDidMount() {
    this.props.getAllRecipes(this.props.match.params.channelId)
  }

  handleClose() {
    this.setState({show: false})
  }

  render() {
    const recipes = this.props.recipes
    return (
      <div id="all-recipes" className="flex-column">
        <div>
          <SingleChannel channelId={this.props.match.params.channelId} />
        </div>
        <div>
          <FontAwesomeIcon
            icon={faPlus}
            onClick={() => {
              this.setState({show: true})
            }}
          />

          <Modal
            show={this.state.show}
            onHide={this.handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Upload a Recipe</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Recipe Name</Form.Label>
                  <Form.Control placeholder="Easy Pancake" />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Ingredients</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="10"
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
                <Form.Group>
                  <Form.Label>Instructions</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="10"
                    placeholder={
                      'In a large bowl, mix flour, sugar, baking powder and salt. Make a well in the center, and pour in milk, egg and oil. Mix until smooth.' +
                      '\n' +
                      'Heat a lightly oiled griddle or frying pan over medium high heat. Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each pancake. Brown on both sides and serve hot.'
                    }
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={this.handleClick}>
                Upload
              </Button>
            </Modal.Footer>
          </Modal>
          {recipes &&
            recipes.map(element => {
              return (
                <div key={element.id} id="single-recipe">
                  <img src={element.imageUrl} id="img" />
                  <div id="recipe-info">
                    <Link
                      to={`/home/channels/${
                        this.props.match.params.channelId
                      }/${element.id}`}
                    >
                      {element.name}
                    </Link>
                  </div>
                </div>
              )
            })}
        </div>
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
