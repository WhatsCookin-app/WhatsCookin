import React from 'react'
import {connect} from 'react-redux'
import {Modal, Jumbotron, ListGroup} from 'react-bootstrap'
import {EditDescription, EditImage, EditName} from './edit-channel-sections'
import {fetchChannel, updateChannel} from '../store/single-channel'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faInfoCircle, faUserFriends} from '@fortawesome/free-solid-svg-icons'

//would be great to allow users to upload their own images here from their devices for image url
class SingleChannel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      imageUrl: '',
      isPrivate: false,
      show: false,
      component: ''
    }
    this.handleChange = this.handleChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.alertClicked = this.alertClicked.bind(this)
  }
  componentDidMount() {
    console.log('Single Channel Component')
    this.props.getChannel(this.props.channelId)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleClick() {
    const bool = this.state.show
    this.setState({show: !bool})
  }

  alertClicked(event) {
    this.setState({component: event.target.name})
  }

  render() {
    const thisChannel = this.props.channel || []
    // console.log(thisChannel)
    // className="d-flex align-items-center mr-5"
    //Make a modal
    // const component = this.sta
    return (
      <>
        <div className="d-flex align-items-center justify-content-between mr-5">
          <div>
            <h1>{thisChannel.name} Recipes</h1>
          </div>

          <div>
            <FontAwesomeIcon icon={faUserFriends} className="cursor" />{' '}
            {this.props.user === thisChannel.userId ? (
              <FontAwesomeIcon
                icon={faInfoCircle}
                onClick={this.handleClick}
                className="cursor"
              />
            ) : (
              ''
            )}
          </div>
          {this.state.show ? (
            <div>
              <h1>Edit</h1>
              <ListGroup>
                <ListGroup.Item
                  action
                  onClick={this.alertClicked}
                  name="EditName"
                >
                  Rename Channel
                </ListGroup.Item>
                <ListGroup.Item
                  action
                  onClick={this.alertClicked}
                  name="EditDescription"
                >
                  Edit Description
                </ListGroup.Item>
                <ListGroup.Item
                  action
                  onClick={this.alertClicked}
                  name="EditImage"
                >
                  Edit Image
                </ListGroup.Item>
                {/* <EditName />
                <EditDescription />
                <EditImage />  */}
              </ListGroup>
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
  channel: state.singleChannel.channel,
  user: state.user.id
})

const mapDispatch = dispatch => ({
  getChannel: channelId => dispatch(fetchChannel(channelId)),
  updateChannel: channel => dispatch(updateChannel(channel))
})

export default connect(mapState, mapDispatch)(SingleChannel)
