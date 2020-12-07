import React, {Component} from 'react'
import axios from 'axios'

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
      <div className="process">
        <label htmlFor="profilePicture">
          <small>Profile Picture</small>
        </label>
        <input
          type="file"
          className="process_upload-btn"
          onChange={e => this.uploadImage(e)}
          name="profilePicture"
        />
        <img
          src={this.state.imagePreview}
          alt="upload-image"
          className="process_image"
          height={100}
        />
      </div>
    )
  }
}

export default UploadImage
