import React, { useState } from 'react';
import { connect } from 'react-redux';
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBInputGroup } from "mdbreact";
import { CloudinaryContext } from 'cloudinary-react';
import { EditorState, convertToRaw, convertFromRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import InputTag from '../InputTag';
import api from '../../api';
import { newNotification } from '../../actioncreators'
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../../styles/Create.scss';
import '../../styles/Editor.scss'
import uploadThumbnail from '../../media/upload-thumbnail2.gif';

function CreateCollection(props) {
    let {dispatch} = props;
    let [titlePic, setTitlePic] = useState('');
    let [pictures, setPictures] = useState([]);
    let [currentCollection, setCurrentCollection] = useState({tags: []})
    let [editorState, setEditorState] = useState(EditorState.createEmpty())

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

    let updateTags = (newTags) => {
        setCurrentCollection({
        ...currentCollection,
        tags: newTags  
        })
    }

    let handleChange = (e) => {
        setCurrentCollection({
            ...currentCollection,
            [e.target.id]: e.target.value
        })
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        const contentState = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
        let data = {...currentCollection, pictures, titlePic, editorState: contentState}
        api.addCollection(data)
        .then(result => {
            dispatch(newNotification(`Your Collection '${result.Collection.title}' has been created`, 'Created'))
            setCurrentCollection({tags: []})
            setPictures([])
            setTitlePic('')
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
                                    // wrapperStyle={{backgroundColor: "#ffffff"}}
                                    // editorStyle={<editorStyleObject>}
                                    // toolbarStyle={<toolbarStyleObject>}
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
