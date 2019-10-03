import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import myWidgets from '../../configs/cloudinary'
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
      message: null
    };
  } 

  componentDidMount(){
    // document.getElementById("upload_widget").addEventListener("click", function(){
    //   myWidgets.uploadTitle.open();
    // }, false);
  }

  handleUploadTitle(){
    console.log("upload title")
    // myWidgets.uploadTitle.open()
    window.cloudinary.createUploadWidget({
      uploadPreset: 'mu7bkqlz'}, (error, result) => { 
          if (!error && result && result.event === "success") { 
          console.log('Done! Here is the image info: ', result.info); 
          console.log(result.info.secure_url)
          } else if (error) console.log(error)
    }).open()
  }

  // uploadWidget = (e) => {
  //   e.preventDefault();
  //   // UPLOAD SINGLE PICTURE FOR THE TITLE
  //   if (e.target.id === "upload-title") {
  //     window.cloudinary.openUploadWidget({ 
  //       cloud_name: process.env.REACT_APP_CLOUD_NAME, 
  //       upload_preset: process.env.REACT_APP_UPLOAD_PRESET,
  //       tags: this.state.tags,
  //       multiple: false
  //     },(error, result) => {
  //         if (result) { this.setState({ titlePic: result[0].secure_url })}
  //         if (error) console.log(error.message);
  //     }); 
  //   // UPLOAD MULTIPLE PICTURES FOR THE GALLERY
  //   } else {
  //     window.cloudinary.openUploadWidget({ 
  //       cloud_name: process.env.REACT_APP_CLOUD_NAME, 
  //       upload_preset: process.env.REACT_APP_UPLOAD_PRESET,
  //       tags: this.state.tags
  //     },(error, result) => {
  //         if (result) {
  //           let newPictures = [ ...this.state.pictures ];
  //           result.forEach(upload => newPictures.push(upload.secure_url));
  //           this.setState({ pictures: newPictures })
  //         }
  //         if (error) console.log(error.message);
  //     }); 
  //   }
  // }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      title: this.state.title,
      titlePic: this.state.titlePic,
      pictures: this.state.pictures,
      tags: this.state.tags,
      description: this.state.description
    };
    api.addArt(data)
    .then(result => {
      console.log('SUCCESS!')
      this.setState({
        title: '',
        titlePic: '',
        pictures: null,
        tags: '',
        description: '',
        message: `Your Art '${result.Art.title}' has been created`
      })
      setTimeout(() => { this.setState({ message: null })}, 2000)
    }).catch(err => this.setState({ message: err.toString() }));
  }

  render() {
    if (api.isLoggedIn()) {
      return (
      <div>
        <h1>Admin</h1>
        <CloudinaryContext cloudName="djyjdargg">
          <button onClick={this.handleUploadTitle} id="upload_widget" className="cloudinary-button">Upload files</button>
        </CloudinaryContext>
        <button onClick={this.handleUploadTitle} id="upload-title" className="upload-button">Add Title-Image</button>          
        {this.state.titlePic && <img src={this.state.titlePic} alt="" width="70px"/>}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" value={this.state.title} onChange={this.handleChange}/><br />
          <label htmlFor="tags">Tags</label>
          <input type="text" name="tags" id="tags" value={this.state.tags} onChange={this.handleChange}/><br />
          <label htmlFor="tags">Description</label>
          <input type="textarea" name="description" id="description" value={this.state.description} onChange={this.handleChange}/><br />
          <button onClick={this.uploadWidget} className="upload-button">Add Image</button>
          <button type="submit">Submit</button>
        </form>
        {this.state.message && <h2>{this.state.message}</h2>}
        {this.state.pictures && this.state.pictures.map((picture, i) => <img src={picture} key ={i} alt="" width="70px"/>)}
      </div>
    )} else {
      this.props.history.push("/login") // Redirect to the login page
      return null
    }
  }
}

export default withRouter(Admin)