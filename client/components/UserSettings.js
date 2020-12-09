import React from 'react'
import {connect} from 'react-redux'
import {editUser} from '../store'
import {UploadImage} from '.'

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
        <form
          onSubmit={evt => {
            evt.preventDefault()
            this.props.editUser(this.state)
          }}
        >
          <p>User Name:</p>
          <input
            type="text"
            name="userName"
            value={this.state.userName}
            onChange={this.onChange}
          />
          <UploadImage
            setImageUrl={profilePicture =>
              this.setState({
                profilePicture
              })
            }
          />
          <button type="submit">Edit User</button>
        </form>
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
