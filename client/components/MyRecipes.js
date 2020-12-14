import React from 'react'
import {connect} from 'react-redux'
import {fetchMyRecipes} from '../store/myRecipe.js'
import {
  deleteChannel,
  fetchChannel,
  updateChannel
} from '../store/single-channel'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHeart, faPlus} from '@fortawesome/free-solid-svg-icons'
import {Modal, Card, OverlayTrigger, Tooltip} from 'react-bootstrap'
import {SingleChannel, AddRecipe} from './index'

class MyRecipes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleAddRecipe = this.handleAddRecipe.bind(this)
  }
  componentDidMount() {
    this.props.getMyRecipes(this.props.user.id)
  }

  handleClose() {
    this.setState({show: false})
  }

  handleAddRecipe() {
    this.setState({show: true})
  }

  render() {
    const recipes = this.props.myRecipes
    return (
      <div className="flex-column view">
        <div className="d-flex align-items-center justify-content-between mr-5">
          <div>
            <h1 className="ml-3">
              You have {recipes.length}{' '}
              {recipes.length > 1 ? 'recipes:' : 'recipe:'}
            </h1>
          </div>

          <div className="d-flex flex-wrap justify-content-center align-items-center ">
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip name="Tool Tip">Add a Recipe</Tooltip>}
            >
              <FontAwesomeIcon
                icon={faPlus}
                onClick={this.handleAddRecipe}
                className="cursor mr-3"
              />
            </OverlayTrigger>
          </div>
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
                    to={{
                      pathname: `/home/recipes/${element.id}`,
                      state: {
                        source: 'myRecipes',
                        channelId: this.props.match.params.channelId
                      }
                    }}
                  >
                    <Card.Img
                      src={element.imageUrl}
                      className="recipe-image rounded"
                    />
                  </Link>
                  {/* <Link
                    to={`/home/recipes/${
                      element.id
                    }`}
                    className="text-info mt-1"
                  > */}
                  <Link
                    to={{
                      pathname: `/home/recipes/${element.id}`,
                      state: {
                        source: 'myRecipes',
                        channelId: this.props.match.params.channelId
                      }
                    }}
                    className="text-recipe-name mt-1"
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
            />
          </Modal>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    myRecipes: state.myRecipes,
    channel: state.singleChannel.channel,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getMyRecipes: userId => dispatch(fetchMyRecipes(userId)),
    getChannel: channelId => dispatch(fetchChannel(channelId)),
    updateChannel: channel => dispatch(updateChannel(channel)),
    deleteChannel: channelId => dispatch(deleteChannel(channelId))
  }
}

export default connect(mapState, mapDispatch)(MyRecipes)
