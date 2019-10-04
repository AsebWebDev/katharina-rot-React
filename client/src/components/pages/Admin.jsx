import React, { useState } from 'react';
import { connect } from 'react-redux';
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import {newNotification} from '../../actioncreators'
import '../../configs/cloudinary'
import api from '../../api';



function Admin (props){
  let {dispatch} = props;
  let [title, setTitle] = useState('');
  let [titlePic, setTitlePic] = useState('');
  let [pictures, setPictures] = useState([]);
  let [tags, setTags] = useState('');
  let [description, setDescription] = useState('');

  let uploadWidget = (e) => {
    let multiple = (e.target.id === "upload-art"); // Multiple pictures for the gallery or one picture as title
    e.preventDefault();
    window.cloudinary.createUploadWidget({ 
      upload_preset: 'mu7bkqlz',
      multiple
    },(error, result) => {
        if (!error && result && result.event === "success") { 
          (multiple) 
          ? setPictures([...pictures, result.info.secure_url] ) // UPLOAD MULTIPLE PICTURES FOR THE GALLERY
          : setTitlePic(result.info.secure_url) // UPLOAD SINGLE PICTURE FOR THE TITLE
        } else if (error) console.log(error)
    }).open(); 
  }
  
  let handleChange = (e) => {
    let {value, name} = e.target;
    switch (name) {
      case "title": setTitle(value); break;
      case "tags": setTags(value); break;
      case "description": setDescription(value); break;
      default: console.log("No target name provided")
    }
  }

  let handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      title,
      titlePic,
      pictures,
      tags: tags.split(' '),
      description
    };
    api.addCollection(data)
    .then(result => {
      console.log('SUCCESS!')
      dispatch(newNotification(`Your Collection '${result.Collection.title}' has been created`))
      setTitle('')
      setTitlePic('')
      setPictures([])
      setTags([])
      setDescription('')
    }).catch(err => dispatch(newNotification(err.toString())));
  }

    if (api.isLoggedIn()) {
      return (
      <div>
        <h1>Admin</h1>
        <CloudinaryContext cloudName="djyjdargg">
          <button onClick={uploadWidget} className="cloudinary-button">Add Title Image</button>
        {titlePic && <img src={titlePic} alt="" width="70px"/>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" value={title} onChange={handleChange}/><br />
          <label htmlFor="tags">Tags</label>
          <input type="text" name="tags" id="tags" value={tags} onChange={handleChange}/><br />
          <label htmlFor="tags">Description</label>
          <input type="textarea" name="description" id="description" value={description} onChange={handleChange}/><br />
          <button onClick={uploadWidget} id="upload-art" className="cloudinary-button">Upload Art</button>
          <button type="submit" className="cloudinary-button">Submit</button>
        </form>
        </CloudinaryContext>
        {pictures && pictures.map((picture, i) => <img src={picture} key ={i} alt="" width="70px"/>)}
      </div>
    )} else {
      props.history.push("/login") // Redirect to the login page
      return null
    }
}

function mapStateToProps(reduxState){
  return {
    collections: reduxState.collections,
    notifications: reduxState.notifications
  }
}

export default connect(mapStateToProps)(Admin)