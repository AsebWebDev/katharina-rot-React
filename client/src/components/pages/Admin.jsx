import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import {newNotification} from '../../actioncreators'
import '../../configs/cloudinary'
import api from '../../api';

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      titlePic: '',
      pictures: [],
      tags: [],
      description: '',
    };
  } 

  uploadWidget = (e) => {
    let multiple = (e.target.id === "upload-art"); // Multiple pictures for the gallery or one picture as title
    e.preventDefault();
    window.cloudinary.createUploadWidget({ 
      upload_preset: 'mu7bkqlz',
      multiple
    },(error, result) => {
        if (!error && result && result.event === "success") { 
          (multiple) 
          ? this.setState({ pictures: [...this.state.pictures, result.info.secure_url] }) // UPLOAD SINGLE PICTURE FOR THE TITLE
          : this.setState({ titlePic: result.info.secure_url }) // UPLOAD MULTIPLE PICTURES FOR THE GALLERY
        } else if (error) console.log(error)
    }).open(); 
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      title: this.state.title,
      titlePic: this.state.titlePic,
      pictures: this.state.pictures,
      tags: this.state.tags.split(' '),
      description: this.state.description
    };
    api.addCollection(data)
    .then(result => {
      console.log('SUCCESS!')
      this.props.dispatch(newNotification(`Your Collection '${result.Collection.title}' has been created`))
      this.setState({
        title: '',
        titlePic: '',
        pictures: null,
        tags: '',
        description: '',
      })
    // }).catch(err => this.setState({ message: err.toString() }));
    }).catch(err => this.props.dispatch(newNotification(err.toString())));
  }

  render() {
    if (api.isLoggedIn()) {
      return (
      <div>
        <h1>Admin</h1>
        <CloudinaryContext cloudName="djyjdargg">
          <button onClick={this.uploadWidget} className="cloudinary-button">Add Title Image</button>
        {this.state.titlePic && <img src={this.state.titlePic} alt="" width="70px"/>}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" value={this.state.title} onChange={this.handleChange}/><br />
          <label htmlFor="tags">Tags</label>
          <input type="text" name="tags" id="tags" value={this.state.tags} onChange={this.handleChange}/><br />
          <label htmlFor="tags">Description</label>
          <input type="textarea" name="description" id="description" value={this.state.description} onChange={this.handleChange}/><br />
          <button onClick={this.uploadWidget} id="upload-art" className="cloudinary-button">Upload Art</button>
          <button type="submit" className="cloudinary-button">Submit</button>
        </form>
        </CloudinaryContext>
        {this.state.pictures && this.state.pictures.map((picture, i) => <img src={picture} key ={i} alt="" width="70px"/>)}
      </div>
    )} else {
      this.props.history.push("/login") // Redirect to the login page
      return null
    }
  }
}

function mapStateToProps(reduxState){
  return {
    collections: reduxState.collections,
    notifications: reduxState.notifications
  }
}

export default connect(mapStateToProps)(Admin)