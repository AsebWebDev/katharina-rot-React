import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { MDBBtn, MDBCardImage, MDBView, MDBMask } from 'mdbreact';
import api from '../../api';

function EditPictures(props) {
    let {dispatch} = props;
    let currentId = props.modal.currentId;
    let [currentCollection, setCurrentCollection] = useState({})
    let [titlePic, setTitlePic] = useState('')
    let [pictures, setPictures] = useState([])

    useEffect(() => {
        api.getOneCollection(currentId) // BACKEND REQUEST AND SET DATA TO STATE
        .then(res => { setCurrentCollection(res.collection) })
        .catch (err => console.log(err))
    }, [currentId])
    
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
    
    return (
        <div className="edit-pictures">
            <MDBBtn color="primary" onClick={uploadWidget}>Edit Title Picture</MDBBtn>
            <div onClick={uploadWidget} className="edit-titlePic">
            <MDBView hover>
                <MDBCardImage className="img-fluid" src={currentCollection.titlePic} waves /> 
                <MDBMask className="flex-center" overlay="red-strong">
                <p className="white-text">Click to edit</p>
                </MDBMask>
            </MDBView>
            </div>
            <div className="edit-gallery">
            {currentCollection.pictures && currentCollection.pictures.map((pic,i) => 
                <MDBCardImage className="img-fluid" key={i} src={pic} waves /> 
            )}
            </div>
            <MDBBtn color="secondary" onClick={uploadWidget} id="upload-art">Edit Gallery</MDBBtn>
        </div>
    )
}

function mapStateToProps(reduxState){
    return {
      modal: reduxState.modal
    }
  }
  
  export default connect(mapStateToProps)(EditPictures)