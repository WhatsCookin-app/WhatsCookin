import React from 'react'
import {connect} from 'react-redux'
import {Modal, Button, OverlayTrigger, Tooltip} from 'react-bootstrap'
import {
  EditDescription,
  EditImage,
  EditName,
  DeleteChannel
} from './edit-channel-sections'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faInfoCircle,
  faTrash,
  faTimesCircle,
  faPlus
} from '@fortawesome/free-solid-svg-icons'
import {AddUser, LeaveChannel} from './index'
import {removeUsers} from '../store/profiles'

//would be great to allow users to upload their own images here from their devices for image url
class SingleChannel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      component: '',
      showModal: false,
      search: false
    }

    this.handleClose = this.handleClose.bind(this)
    this.handleShow = this.handleShow.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.clickedComponent = this.clickedComponent.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }
  componentDidMount() {
    this.props.getChannel(this.props.channelId)
  }

  handleClick() {
    const bool = this.state.show
    this.setState({show: !bool})
  }

  handleClose() {
    this.setState({show: false})
  }

  handleCloseModal() {
    const check = this.props.profiles.length ? this.props.removeUsers() : ''
    this.setState({showModal: false, search: false})
  }

  handleShow(event) {
    this.clickedComponent(event)
    this.setState({showModal: true})
  }

  handleSearch() {
    const bool = this.state.search
    this.setState({search: !bool})
  }

  handleDelete() {
    this.setState({component: 'Delete Channel', showModal: true})
  }

  clickedComponent(event) {
    console.log(event.target)
    this.setState({component: event.target.name})
  }

  render() {
    const thisChannel = this.props.channel || []
    return (
      <>
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <div className="ml-3 mt-3">
              <h1>{thisChannel.name} Recipes</h1>
            </div>

            <div className="d-flex align-items-center mt-3 ml-4">
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip name="Tool Tip">Add a Recipe</Tooltip>}
              >
                <FontAwesomeIcon
                  icon={faPlus}
                  onClick={this.props.handleAddRecipe}
                  className="cursor mr-3"
                />
              </OverlayTrigger>

              <AddUser
                search={this.state.search}
                handleCloseModal={this.handleCloseModal}
                handleSearch={this.handleSearch}
              />
              {this.props.user === thisChannel.userId ? (
                <div>
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    onClick={this.handleClick}
                    className="cursor"
                  />
                </div>
              ) : (
                ''
              )}
              <LeaveChannel channelId={thisChannel.id} />
            </div>
          </div>
          {this.state.show ? (
            <div className="mr-3">
              <div className="d-flex justify-content-between align-items-center">
                <h1>Edit</h1>
                <FontAwesomeIcon
                  icon={faTimesCircle}
                  className="cursor"
                  onClick={this.handleClick}
                />
              </div>
              <Button
                variant="warning"
                onClick={this.handleShow}
                name="Rename Channel"
                className="mr-1 mb-1"
              >
                Rename Channel
              </Button>{' '}
              <Button
                variant="warning"
                onClick={this.handleShow}
                name="Edit Description"
                className="mr-1 mb-1"
              >
                Edit Description
              </Button>{' '}
              <Button
                variant="warning"
                onClick={this.handleShow}
                name="Edit Image"
                className="mr-1 mb-1"
              >
                Edit Image
              </Button>{' '}
              <Button
                variant="danger"
                onClick={this.handleDelete}
                name="Delete Channel"
                className="mr-1 mb-1"
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  className="cursor"
                  name="Delete Channel"
                />
              </Button>{' '}
              <Modal
                backdrop="static"
                show={this.state.showModal}
                onHide={this.handleClose}
              >
                <Modal.Header>
                  <Modal.Title>{this.state.component}</Modal.Title>
                </Modal.Header>
                {this.state.component === 'Rename Channel' ? (
                  <EditName
                    handleClose={this.handleCloseModal}
                    channel={this.props.channel}
                    updateChannel={this.props.updateChannel}
                  />
                ) : this.state.component === 'Edit Description' ? (
                  <EditDescription
                    handleClose={this.handleCloseModal}
                    channel={this.props.channel}
                    updateChannel={this.props.updateChannel}
                  />
                ) : this.state.component === 'Edit Image' ? (
                  <EditImage
                    handleClose={this.handleCloseModal}
                    channel={this.props.channel}
                    updateChannel={this.props.updateChannel}
                  />
                ) : this.state.component === 'Delete Channel' ? (
                  <DeleteChannel
                    handleClose={this.handleCloseModal}
                    channel={this.props.channel}
                    deleteChannel={this.props.deleteChannel}
                  />
                ) : (
                  ''
                )}
              </Modal>
            </div>
          ) : (
            ''
          )}
        </div>
      </>
    )
  }
}

const mapState = state => ({
  user: state.user.id,
  profiles: state.profiles
})

const mapDispatch = dispatch => ({
  removeUsers: () => dispatch(removeUsers())
})

export default connect(mapState, mapDispatch)(SingleChannel)
