import React, {Component} from 'react'
import axios from 'axios'
import {Form, Image} from 'react-bootstrap'

class UploadImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imagePreview: '/img/default-img.jpg'
    }
    this.uploadImage = this.uploadImage.bind(this)
  }

  async uploadImage(e) {
    let imageFormObj = new FormData()
    imageFormObj.append('imageData', e.target.files[0])
    //stores a readable instance of the image being uploaded using multer
    const {data} = await axios.post('/api/image/upload', imageFormObj)
    this.setState({
      imagePreview: data
    })
    this.props.setImageUrl(data)
  }

  render() {
    return (
      <div className="m-0">
        <Form.Group controlId="profilePicture">
          <Form.Label>Profile Picture</Form.Label>
          <br />
          <Image
            src={this.state.imagePreview}
            style={{width: '180px', height: '171px'}}
            className="mb-1"
            rounded
            alt="upload-image"
          />{' '}
          <br />
          <Form.File
            id="profilePicture"
            name="profilePicture"
            className="m-0 mb-1"
            onChange={e => this.uploadImage(e)}
          />
        </Form.Group>
      </div>
    )
  }
}

export default UploadImage
