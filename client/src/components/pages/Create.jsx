import React, { useState } from 'react';
import { connect } from 'react-redux';
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBIcon, MDBInputGroup } from "mdbreact";
import { CloudinaryContext } from 'cloudinary-react';
import api from '../../api';
import { newNotification } from '../../actioncreators'
import './Create.css'
import uploadThumbnail from '../../media/upload-thumbnail2.gif'

function Create(props) {
    let {dispatch} = props;
    let [titlePic, setTitlePic] = useState('');
    let [pictures, setPictures] = useState([]);
    let [currentCollection, setCurrentCollection] = useState({})


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
            dispatch(newNotification(`Your Collection '${result.Collection.title}' has been created`, 'Created'))
            setCurrentCollection({})
            setPictures([])
        }).catch(err => dispatch(newNotification(err.toString())));
    }

    return (
        <MDBContainer className="create-page mt-5 text-center">
            <MDBRow>
            <MDBCol>
                <MDBJumbotron>
                    <h4 className="h5 display-5">Create a new Collection</h4>
                    <CloudinaryContext cloudName="djyjdargg">
                    <form className="create-form" onSubmit={handleSubmit}>
                        <MDBInputGroup id="title" containerClassName="mb-3" onChange={handleChange} value={currentCollection.title} prepend="Title" hint="..."/>
                        
                        {titlePic && <img onClick={uploadWidget} className="title-pic" src={titlePic} alt=""/>}
                        {!titlePic && <p><MDBBtn onClick={uploadWidget} className="cloudinary-button">
                            <img className="upload-thumbnail" src={uploadThumbnail} alt="upload-thumbnail"/>Add Title Image
                        </MDBBtn></p>}
                        <MDBInputGroup id="tags" containerClassName="mb-3" onChange={handleChange} value={(currentCollection.tags)?currentCollection.tags.join(' '):''} prepend="Tags" hint="..."/>

                        {/* <label htmlFor="tags">Tags</label>
                        <input type="text" name="tags" id="tags" value={currentCollection.tags || ''} onChange={handleChange}/><br /> */}
                        <label htmlFor="tags">Description</label>
                        <input type="textarea" name="description" id="description" value={currentCollection.description || ''} onChange={handleChange}/><br />
              
                        <p><MDBBtn onClick={uploadWidget} id="upload-art" className="cloudinary-button">Upload Art</MDBBtn></p>
                        <p><MDBBtn type="submit" className="cloudinary-button">Submit</MDBBtn></p>
                    </form>
                    </CloudinaryContext>
                    {pictures && pictures.map((picture, i) => <img src={picture} key ={i} alt="" width="70px"/>)}
                </MDBJumbotron>
            </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}

function mapStateToProps(reduxState){
    return {
      collections: reduxState.collections,
      notifications: reduxState.notifications,
    }
}
  
export default connect(mapStateToProps)(Create)
