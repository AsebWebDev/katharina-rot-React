import React, { useState } from 'react';
import { connect } from 'react-redux';
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBInputGroup } from "mdbreact";
import { CloudinaryContext } from 'cloudinary-react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import InputTag from '../InputTag';
import api from '../../api';
import { newNotification } from '../../actioncreators'
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../../styles/Create.scss';
import '../../styles/Editor.scss'
import uploadThumbnail from '../../media/upload-thumbnail2.gif';

function CreateCollection(props) {
    const {dispatch} = props;
    const [titlePic, setTitlePic] = useState('');
    const [pictures, setPictures] = useState([]);
    const [currentCollection, setCurrentCollection] = useState({tags: []})
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const uploadWidget = (e) => {
        e.preventDefault();
        const uploadedPictures = []
        const multiple = (e.target.id === "upload-art"); // Multiple pictures for the gallery or one picture as title
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

    const updateTags = (newTags) => {
        setCurrentCollection({
        ...currentCollection,
        tags: newTags  
        })
    }

    const handleChange = (e) => {
        setCurrentCollection({
            ...currentCollection,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const contentState = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
        const data = {...currentCollection, pictures, titlePic, editorState: contentState}
        api.addCollection(data)
        .then(result => {
            dispatch(newNotification(`Your Collection '${result.Collection.title}' has been created`, 'Created'))
            setCurrentCollection({tags: []})
            setPictures([])
            setTitlePic('')
            setEditorState(EditorState.createEmpty())
        }).catch(err => dispatch(newNotification(err.toString())));
    }

    return (
        <MDBContainer className="create-page mt-5 text-center">
            <MDBRow>
            <MDBCol>
                <MDBJumbotron>
                    <h4 className="h5 display-5">Create a new Collection</h4>
                    <CloudinaryContext cloudName="djyjdargg">
                    <form className="create-form" >
                        <MDBInputGroup id="title" containerClassName="mb-3" onChange={handleChange} value={currentCollection.title || ''} prepend="Title" hint="..."/>
                        
                        {titlePic && <img onClick={uploadWidget} className="mini-pic hoverable" src={titlePic} alt=""/>}
                        {!titlePic && <p id="upload-widget-btn"><MDBBtn onClick={uploadWidget} color="primary">
                            <img className="upload-thumbnail" src={uploadThumbnail} alt="upload-thumbnail"/>Add Title Image
                        </MDBBtn></p>}
                        {currentCollection && currentCollection.tags && <InputTag id="input-tag" tags={currentCollection.tags} updateTags={e => updateTags(e)}/>}
                        <div id="input-description-create">
                           <MDBInputGroup id="description" onChange={handleChange} value={currentCollection.description || ''} prepend="Short Description" type="textarea"/>
                            <div className="editor-content-edit">
                                <Editor 
                                    wrapperClassName="editor-wrapper"
                                    editorClassName="editor-main"
                                    toolbarClassName="editor-toolbar"
                                    editorState={editorState}
                                    onEditorStateChange={setEditorState}
                                    localization={{ locale: 'de' }}
                                />  
                            </div>
                        </div>
                        <div id="main-menu-buttons">
                            <div><MDBBtn onClick={uploadWidget} id="upload-art" className="cloudinary-button">Upload Art</MDBBtn></div>
                            <div><MDBBtn onClick={handleSubmit} color="success">Submit</MDBBtn></div>
                        </div>
                    </form>
                    </CloudinaryContext>
                    <div id="gallery-create">
                        {pictures && pictures.map((picture, i) => <img className="mini-pic hoverable" src={picture} key ={i} alt=""/>)}
                    </div>
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
  
export default connect(mapStateToProps)(CreateCollection)
