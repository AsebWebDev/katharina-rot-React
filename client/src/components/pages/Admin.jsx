import React, { Component } from 'react'
import api from '../../api';

export default class Admin extends Component {
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

  uploadWidget = (e) => {
    e.preventDefault();
    if (e.target.id === "upload-title") {
      window.cloudinary.openUploadWidget({ 
        cloud_name: 'Djyjdargg', 
        upload_preset: 'mu7bkqlz',
        tags: this.state.tags,
        multiple: false
      },
        (error, result) => {
          if (result) {
            this.setState({ titlePic: result[0].secure_url })
          }
          if (error) console.log(error.message);
      }); 
    } else {
      window.cloudinary.openUploadWidget({ 
        cloud_name: 'Djyjdargg', 
        upload_preset: 'mu7bkqlz',
        tags: this.state.tags
      },
        (error, result) => {
          if (result) {
            let newPictures = [ ...this.state.pictures ];
            result.forEach(upload => newPictures.push(upload.secure_url));
            this.setState({ pictures: newPictures })
          }
          if (error) console.log(error.message);
      }); 
    }
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
      setTimeout(() => {
        this.setState({
          message: null
        })
      }, 2000)
    })
    .catch(err => this.setState({ message: err.toString() }));
  }

  render() {
    return (
      <div>
        <h1>Admin</h1>
        <button onClick={this.uploadWidget} id="upload-title" className="upload-button">Add Title-Image</button>          
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
    )
  }
}
