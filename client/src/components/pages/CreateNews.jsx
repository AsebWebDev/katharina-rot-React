import React, { useState } from 'react';
import { connect } from 'react-redux';
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBInputGroup } from "mdbreact";
import { CloudinaryContext } from 'cloudinary-react';
import InputTag from '../InputTag'
import api from '../../api';
import { newNotification } from '../../actioncreators'
import '../../styles/Create.scss'
import uploadThumbnail from '../../media/upload-thumbnail2.gif'

function CreateNews(props) {
    let {dispatch} = props;
    let [titlePic, setTitlePic] = useState('');
    let [thumbnail, setThumbnail] = useState('');
    let [pictures, setPictures] = useState([]);
    let [currentNews, setCurrentNews] = useState({tags: []})

    let uploadWidget = (e) => {
        e.preventDefault();
        let uploadedPictures = []
        let multiple = (e.target.id === "upload-art"); // Multiple pictures for the gallery or one picture as title
        window.cloudinary.createUploadWidget({ 
            upload_preset: 'ypmn3qkk',
            multiple
        },(error, result) => {
        console.log("TCL: uploadWidget -> result", result.info)
            if (!error && result && result.event === "success") { 
                if (multiple) uploadedPictures.push(result.info.secure_url)   // If one of few files is uploaded, store in array to be pushed after user closes widget
                else {
                    setTitlePic(result.info.secure_url);             // UPLOAD SINGLE PICTURE FOR THE TITLE ON UPLOAD FINISH
                    setThumbnail(result.info.thumbnail_url)
                }
            }
            if (!error && result && result.event === "close" && multiple) {   // If user closes widget use all uploaded pictures stored while uploading
                setPictures(uploadedPictures)                     // UPLOAD MULTIPLE PICTURES FOR THE GALLERY ON CLOSE
            }
        }).open(); 
    }

    let updateTags = (newTags) => {
        setCurrentNews({
        ...currentNews,
        tags: newTags  
        })
    }

    let handleChange = (e) => {
        setCurrentNews({
            ...currentNews,
            [e.target.id]: e.target.value
        })
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        let data = {...currentNews, titlePic, thumbnail}
        api.addNews(data)
        .then(result => {
        console.log("TCL: handleSubmit -> result", result)
            dispatch(newNotification(`Your News '${result.news.title}' has been created`, 'Created'))
            setCurrentNews({tags: []})
            setTitlePic('')
            setThumbnail('')
            api.getNews()
                .then(news => props.dispatch({
                    type: "GET_NEWS", 
                    news
                })).catch (err => console.log(err))
        }).catch(err => dispatch(newNotification(err.toString())));
    }

    return (
        <MDBContainer className="create-page mt-5 text-center">
            <MDBRow>
            <MDBCol>
                <MDBJumbotron>
                    <h4 className="h5 display-5">Create News</h4>
                    <CloudinaryContext cloudName="djyjdargg">
                    <form className="create-form">
                        <MDBInputGroup id="title" containerClassName="mb-3" onChange={handleChange} value={currentNews.title || ''} prepend="Title" hint="..."/>
                        
                        {titlePic && <img onClick={uploadWidget} className="mini-pic hoverable" src={titlePic} alt=""/>}
                        {!titlePic && <p id="upload-widget-btn"><MDBBtn onClick={uploadWidget} color="primary">
                            <img className="upload-thumbnail" src={uploadThumbnail} alt="upload-thumbnail"/>Add Title Image
                        </MDBBtn></p>}
                        {currentNews && currentNews.tags && <InputTag id="input-tag" tags={currentNews.tags} updateTags={e => updateTags(e)}/>}
                        <div id="input-description-create">
                           <MDBInputGroup id="description" onChange={handleChange} value={currentNews.description || ''} prepend="Description" type="textarea"/>
                        </div>
                        <p id="main-menu-buttons">
                            <p><MDBBtn onClick={uploadWidget} id="upload-art" className="cloudinary-button">Upload Art</MDBBtn></p>
                            <p><MDBBtn onClick={handleSubmit}  color="success">Submit</MDBBtn></p>
                        </p>
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
      news: reduxState.news
    }
}
  
export default connect(mapStateToProps)(CreateNews)
