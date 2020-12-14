import React from 'react'
import {connect} from 'react-redux'
import {fetchRecipes} from '../store/recipe.js'
import {
  deleteChannel,
  fetchChannel,
  updateChannel
} from '../store/single-channel'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHeart} from '@fortawesome/free-solid-svg-icons'
import {Modal, Card} from 'react-bootstrap'
import {SingleChannel, AddRecipe} from './index'
import NotFound from './notFound.js'

class Recipes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleAddRecipe = this.handleAddRecipe.bind(this)
  }
  componentDidMount() {
    this.props.getAllRecipes(this.props.match.params.channelId)
  }

  handleClose() {
    this.setState({show: false})
  }

  handleAddRecipe() {
    this.setState({show: true})
  }

  render() {
    const recipes = this.props.recipes
    if (!recipes.length) {
      return <NotFound />
    }
    return (
      <div id="all-recipes" className="flex-column view">
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
        <div className="d-flex flex-wrap justify-content-center align-items-center">
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
                        source: 'channels',
                        channelId: this.props.match.params.channelId
                      }
                    }}
                  >
                    <Card.Img
                      src={element.imageUrl}
                      className="recipe-image rounded"
                    />
                  </Link>
                  <Link
                    to={{
                      pathname: `/home/recipes/${element.id}`,
                      state: {
                        source: 'channels',
                        channelId: this.props.match.params.channelId
                      }
                    }}
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
            <AddRecipe
              close={this.handleClose}
              channelId={this.props.match.params.channelId}
              source="channel"
            />
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
    getChannel: channelId => dispatch(fetchChannel(channelId)),
    updateChannel: channel => dispatch(updateChannel(channel)),
    deleteChannel: channelId => dispatch(deleteChannel(channelId))
  }
}

export default connect(mapState, mapDispatch)(Recipes)
