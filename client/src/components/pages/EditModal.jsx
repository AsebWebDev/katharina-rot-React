import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInputGroup } from 'mdbreact';
import { toggleModal, setUploadedPics, newNotification } from '../../actioncreators'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import EditPictures from './EditPictures'
import InputTag from '../InputTag'
import api from '../../api';
import '../../styles/EditModal.css'

function EditModal(props) {
  const { dispatch } = props;
  const { currentId, type } = props.modal;
  const [currentTarget, setCurrentTarget] = useState({})
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  useEffect(() => {
    (type === "collection")
    ?   api.getOneCollection(currentId) // BACKEND REQUEST AND SET DATA TO STATE
        .then(res => { 
          setCurrentTarget(res.collection)
          setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(res.collection.editorState))))
        }).catch (err => console.log(err))
    :   api.getOneNews(currentId) // BACKEND REQUEST AND SET DATA TO STATE
        .then(res => { 
          setCurrentTarget(res.news)
          setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(res.news.editorState))))
        }).catch (err => console.log(err))
  }, [currentId, type])

  const toggle = () => { dispatch(toggleModal(props.modal)) }

  const updateTags = (newTags) => {
    setCurrentTarget({ ...currentTarget, tags: newTags })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const contentState = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    const body = {
      ...currentTarget,
      pictures: props.uploadedPictures ? props.uploadedPictures : currentTarget.pictures, // use uploaded pictures if exists
      titlePic: props.uploadedTitlePic ? props.uploadedTitlePic : currentTarget.titlePic, // use uploaded Titlepic if exists
      editorState: contentState
    };
    console.log("TCL: handleSubmit -> type", type);
    (type === "collection")
    ? api.updateCollection(currentId, body)
          .then(result => {
            dispatch({ type: "GET_DATA", collections: result.collections })
            dispatch(newNotification(`Your Collection '${currentTarget.title}' has been updated.`, 'Updated'))
          }).catch (err => console.log(err))
    :   api.updateNews(currentId, body)
          .then(result => {
            dispatch({ type: "GET_NEWS", news: result.news })
            dispatch(newNotification(`Your News '${currentTarget.title}' has been updated.`, 'Updated'))
          }).catch (err => console.log(err))
    dispatch(setUploadedPics(null,null)) //clear uploaded pictures after successfull submit
    toggle();
  }

  const handleChange = (e) => {
    setCurrentTarget({
      ...currentTarget,
      [e.target.id]: (e.target.id==="tags") 
                        ? e.target.value.split(' ') // turn input value into array
                        : e.target.value        
    })
  }

  const handleclose = () => {
    dispatch(setUploadedPics(null,null)) //clear uploaded pictures after cancelling
    toggle()
  }

  return (
    <MDBContainer>
      <MDBModal size="lg" isOpen={props.modal.isOpen} toggle={toggle}>
        <form>    
          <MDBModalHeader toggle={toggle}>
            <MDBInputGroup id="title" containerClassName="mb-3" onChange={handleChange} value={currentTarget.title} prepend="Title" hint="Title"/>
          </MDBModalHeader>
          <MDBModalBody>
            <EditPictures />
            {currentTarget && currentTarget.tags && <InputTag id="input-tag" tags={currentTarget.tags} updateTags={updateTags}/>}
            <div id="input-description">
              <MDBInputGroup id="description" onChange={handleChange} value={currentTarget.description?currentTarget.description:''} prepend="Description" type="textarea"/>
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
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={handleclose}>Close</MDBBtn>
            <MDBBtn color="primary" onClick={handleSubmit}>Save changes</MDBBtn>
          </MDBModalFooter>
        </form>
      </MDBModal>
    </MDBContainer>
  );
}


function mapStateToProps(reduxState){
  return {
    modal: reduxState.modal,
    uploadedPictures: reduxState.uploadedPictures,
    uploadedTitlePic: reduxState.uploadedTitlePic
  }
}

export default connect(mapStateToProps)(EditModal)