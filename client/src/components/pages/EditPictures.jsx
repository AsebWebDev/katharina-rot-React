import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { MDBBtn } from 'mdbreact';
import { setUploadedPics } from '../../actioncreators'
import api from '../../api';
import '../../styles/EditPictures.css'

function EditPictures(props) {
    const { dispatch } = props;
    const { currentId, type } = props.modal;
    const [currentTarget, setCurrentTarget] = useState({})
    const [isUploadDone, setIsUploadDone] = useState(false)
    const [uploadedPictures, setUploadedPictures] = useState(props.uploadedPictures)
    const [uploadedTitlePic, setUploadedTitlePic] = useState(props.uploadedTitlePic)

    useEffect(() => {
        (type === "collection")
        ? api.getOneCollection(currentId) // BACKEND REQUEST AND SET DATA TO STATE
            .then(res => { setCurrentTarget(res.collection) })
            .catch (err => console.log(err))
        : api.getOneNews(currentId) // BACKEND REQUEST AND SET DATA TO STATE
            .then(res => { setCurrentTarget(res.news) })
            .catch (err => console.log(err))
    }, [currentId, dispatch, type])

    useEffect(() => {
        if (isUploadDone) {
            dispatch(setUploadedPics(
                uploadedPictures,
                uploadedTitlePic
            ))
            setIsUploadDone(false)
        }
    }, [isUploadDone, uploadedPictures, uploadedTitlePic, dispatch])

    useEffect(() => {
        dispatch(setUploadedPics(null, null))
        setUploadedPictures(null)   // clear formerly uploaded Pictures, when model is opened
        setUploadedTitlePic(null)   // clear formerly uploaded Title Picture, when model is opened
    }, [props.modal.isOpen, dispatch])
    
    const uploadWidget = (e) => {
        e.preventDefault();
        const newArr = uploadedPictures?[...uploadedPictures]:[];
        const multiple = (e.target.id === "upload-art"); // Multiple pictures for the gallery or one picture as title
        window.cloudinary.createUploadWidget({ 
          upload_preset: 'mu7bkqlz',
          multiple,
        },(error, result) => {
            if (!error && result && result.event === "queues-end") { setIsUploadDone(true) } //FIXME: only one pic picked, "queues-end not triggered"
            if (!error && result && result.event === "success") { 
              if (multiple) {
                newArr.push(result.info.secure_url) 
                setUploadedPictures(newArr)
              } else {
                const newURL = result.info.secure_url  
                setUploadedTitlePic(newURL)
                setIsUploadDone(true)
              }
            }
        }).open()
    }
          
    return (
        <div className="edit-pictures">
            <div className="left">
                <div className="title-pic">
                    <img className="mini-pic z-depth-3" src={props.uploadedTitlePic ? props.uploadedTitlePic : currentTarget.titlePic} alt="tital" /> 
                </div>
                <div className="mini-gallery">
                    {props.uploadedPictures                  // if not undefined...
                        && props.uploadedPictures.length > 0 // ...and not empty...
                        && props.uploadedPictures            // ... show uploaded ones, else show old ones 
                            ? props.uploadedPictures && props.uploadedPictures.slice(0,3).map((pic,i) => <img className="mini-pic hoverable" key={i} src={pic} alt="gallery-pic" />)
                            : currentTarget.pictures && currentTarget.pictures.slice(0,3).map((pic,i) => <img className="mini-pic hoverable" key={i} src={pic} alt="gallery-pic" />)
                    }
                </div>
            </div>
            <div className="right">
                <div><MDBBtn color="primary" onClick={uploadWidget}>Edit Title Picture</MDBBtn></div>
                <div><MDBBtn color="secondary" onClick={uploadWidget} id="upload-art">Edit Gallery</MDBBtn></div>
            </div>
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