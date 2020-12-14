import React from 'react'
import {connect} from 'react-redux'
import {editUser} from '../store'
import {UploadImage} from '.'
import {Form, Button, Image} from 'react-bootstrap'

class UserSettings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: props.user.userName,
      profilePicture: ''
    }
    this.onChange = this.onChange.bind(this)
  }
  onChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  render() {
    return (
      <div className="view">
        <div className="d-flex ml-3">
          <h1>
            Hi,<span className="mr-1">
              <Image
                src={this.props.user.profilePicture}
                className="profilepic ml-1"
              />
            </span>
            {this.props.user.firstName} {this.props.user.lastName}
          </h1>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <h1>Edit your profile:</h1>
        </div>
        <div className=" ml-5">
          <Form
            className="d-flex flex-column"
            onSubmit={evt => {
              evt.preventDefault()
              this.props.editUser(this.state)
            }}
          >
            <div>
              <Form.Group controlId="userName" name="userName">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  name="userName"
                  type="userName"
                  onChange={this.onChange}
                  value={this.state.userName}
                />
              </Form.Group>
            </div>
            <UploadImage
              setImageUrl={profilePicture =>
                this.setState({
                  profilePicture
                })
              }
            />
            <div>
              <Button variant="primary" type="submit">
                Edit Profile
              </Button>
            </div>
          </Form>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user
})

const mapDispatch = dispatch => ({
  editUser: body => dispatch(editUser(body))
})

export default connect(mapState, mapDispatch)(UserSettings)
