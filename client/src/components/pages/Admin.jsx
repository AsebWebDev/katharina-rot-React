import React, { useState } from 'react';
import { connect } from 'react-redux';
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import {newNotification} from '../../actioncreators'
import '../../configs/cloudinary'
import api from '../../api';

function Admin (props){
  let {dispatch} = props;
  let [currentCollection, setCurrentCollection] = useState({})
  let [titlePic, setTitlePic] = useState('');
  let [pictures, setPictures] = useState([]);

  let uploadWidget = (e) => {
    e.preventDefault();
    let uploadedPictures = []
    let multiple = (e.target.id === "upload-art"); // Multiple pictures for the gallery or one picture as title
    window.cloudinary.createUploadWidget({ 
      upload_preset: 'mu7bkqlz',
      multiple
    },(error, result) => {
        if (!error && result && result.event === "success") { 
          (multiple) 
          ? uploadedPictures.push(result.info.secure_url)   // If one of few files is uploaded, store in array to be pushed after user closes widget
          : setTitlePic(result.info.secure_url)             // UPLOAD SINGLE PICTURE FOR THE TITLE ON UPLOAD FINISH
        }
        if (!error && result && result.event === "close" && multiple) {   // If user closes widget use all uploaded pictures stored while uploading
          setPictures(uploadedPictures)                     // UPLOAD MULTIPLE PICTURES FOR THE GALLERY ON CLOSE
        }
    }).open(); 
  }
  
  let handleChange = (e) => {
    setCurrentCollection({
      ...currentCollection,
      [e.target.id]: e.target.value
    })
  }

  let handleSubmit = (e) => {
    e.preventDefault();
    let data = {...currentCollection, pictures, titlePic}
    api.addCollection(data)
    .then(result => {
      console.log('SUCCESS!')
      dispatch(newNotification(`Your Collection '${result.Collection.title}' has been created`, 'Created'))
      setCurrentCollection({})
      setPictures([])
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
          <input type="text" name="title" id="title" value={currentCollection.title || ''} onChange={handleChange}/><br />
          <label htmlFor="tags">Tags</label>
          <input type="text" name="tags" id="tags" value={currentCollection.tags || ''} onChange={handleChange}/><br />
          <label htmlFor="tags">Description</label>
          <input type="textarea" name="description" id="description" value={currentCollection.description || ''} onChange={handleChange}/><br />
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