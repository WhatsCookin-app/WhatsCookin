import React from 'react'
import {Form, Modal} from 'react-bootstrap'
import {connect} from 'react-redux'
import {fetchProfiles, removeUsers, addProfile} from '../store/profiles'
import {UserProfiles} from './index'

class SearchUsers extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    event.target.value
      ? this.props.getProfiles(event.target.value)
      : this.props.removeUsers()
  }

  render() {
    return (
      <Modal show={this.props.search} onHide={this.props.handleCloseModal}>
        <Modal.Header>
          <Modal.Title>Add People</Modal.Title>
        </Modal.Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="lookupValue">
            <Form.Control
              name="lookupValue"
              type="lookupValue"
              // value={this.state.lookupValue}
              onChange={this.handleChange}
              placeholder="Search by name"
            />
          </Form.Group>
        </Form>
        {this.props.profiles.length ? (
          <UserProfiles
            profiles={this.props.profiles}
            channel={this.props.channel}
            addUser={this.props.addUser}
            removeUsers={this.props.removeUsers}
            close={this.props.handleCloseModal}
          />
        ) : (
          ''
        )}
      </Modal>
    )
  }
}

const mapState = state => ({
  profiles: state.profiles,
  channel: state.singleChannel.channel
})

const mapDispatch = dispatch => ({
  getProfiles: lookupValue => dispatch(fetchProfiles(lookupValue)),
  removeUsers: () => dispatch(removeUsers()),
  addUser: body => dispatch(addProfile(body))
})

export default connect(mapState, mapDispatch)(SearchUsers)
