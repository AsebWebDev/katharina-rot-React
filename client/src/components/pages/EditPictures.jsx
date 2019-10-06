import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { MDBBtn, MDBCardImage, MDBView, MDBMask } from 'mdbreact';
import { setUploadedPics } from '../../actioncreators'
import api from '../../api';

function EditPictures(props) {
    let {dispatch} = props;
    let currentId = props.modal.currentId;
    let [currentCollection, setCurrentCollection] = useState({})
    let [uploadedPictures, setUploadedPictures] = useState(props.uploadedPictures)
    let [uploadedTitlePic, setUploadedTitlePic] = useState(props.uploadedTitlePic)
    // FIXME:   When uploading multiple pictures, only one is shown at first. After rerender (f.e. because a titlePic has been uploaded)
    //          they appear. So when the Widget is closed, a rerender is not triggert. FIXME: rerender after widgest closes 

    useEffect(() => {
        api.getOneCollection(currentId) // BACKEND REQUEST AND SET DATA TO STATE
        .then(res => { setCurrentCollection(res.collection) })
        .catch (err => console.log(err))
    }, [currentId])


    useEffect(() => {
        dispatch(setUploadedPics(
            uploadedPictures,
            uploadedTitlePic
        ))
    }, [uploadedPictures, uploadedTitlePic, dispatch])

    useEffect(() => {
        setUploadedPictures(null)   // clear formerly uploaded Pictures, when model is opened
        setUploadedTitlePic(null)   // clear formerly uploaded Title Picture, when model is opened
    }, [props.modal.isOpen])
    
    let uploadWidget = (e) => {
        e.preventDefault();
        let newArr = props.uploadedPictures?[...props.uploadedPictures]:[];
        let multiple = (e.target.id === "upload-art"); // Multiple pictures for the gallery or one picture as title
        window.cloudinary.createUploadWidget({ 
          upload_preset: 'mu7bkqlz',
          multiple,
        },(error, result) => {
            if (!error && result && result.event === "success") { 
              if (multiple) {
                newArr.push(result.info.secure_url) 
                setUploadedPictures(newArr)
              } else {
                let newURL = result.info.secure_url  
                setUploadedTitlePic(newURL)
              }
            }
        }).open()
    }
          
    return (
        <div className="edit-pictures">
            <MDBBtn color="primary" onClick={uploadWidget}>Edit Title Picture</MDBBtn>
            <div onClick={uploadWidget} className="edit-titlePic">
            <MDBView hover>
                <MDBCardImage className="img-fluid" src={props.uploadedTitlePic ? props.uploadedTitlePic : currentCollection.titlePic} waves /> 
                <MDBMask className="flex-center" overlay="red-strong">
                    <p className="white-text">Click to edit</p>
                </MDBMask>
            </MDBView>
            </div>
            <div className="edit-gallery">
            {uploadedPictures                  // if not undefined...
                && uploadedPictures.length > 0 // ...and not empty...
                && uploadedPictures            // ... show uploaded ones, else show old ones 
                    ? uploadedPictures && uploadedPictures.map((pic,i) => <MDBCardImage className="img-fluid" key={i} src={pic} waves />)
                    : currentCollection.pictures && currentCollection.pictures.map((pic,i) => <MDBCardImage className="img-fluid" key={i} src={pic} waves />)
            }
            </div>
            <MDBBtn color="secondary" onClick={uploadWidget} id="upload-art">Edit Gallery</MDBBtn>
        </div>
    )
}

function mapStateToProps(reduxState){
    return {
      modal: reduxState.modal,
      uploadedPictures: reduxState.uploadedPictures,
      uploadedTitlePic: reduxState.uploadedTitlePic
    }
  }
  
  export default connect(mapStateToProps)(EditPictures)