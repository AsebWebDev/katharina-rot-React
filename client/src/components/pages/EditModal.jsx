import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInputGroup, MDBCardImage, MDBView, MDBMask } from 'mdbreact';
import { toggleModal, setUploadedPics } from '../../actioncreators'
import EditPictures from './EditPictures'
import api from '../../api';
import './EditModal.css'

function EditModal(props) {
  let {dispatch} = props;
  let currentId = props.modal.currentId;
  let [currentCollection, setCurrentCollection] = useState({})

  useEffect(() => {
    api.getOneCollection(currentId) // BACKEND REQUEST AND SET DATA TO STATE
    .then(res => { setCurrentCollection(res.collection) })
    .catch (err => console.log(err))
  }, [currentId])

  let toggle = () => { dispatch(toggleModal(props.modal)) }

  let handleSubmit = (e) => {
    console.log("Handle Submit clicked")
    e.preventDefault();
    
    dispatch(setUploadedPics([],'')) //clear uploaded pictures after successfull submit
    console.log(props.uploadedTitlePic)
    console.log(props.uploadedpictures)
    toggle();
  }

  let handleChange = (e) => {
    setCurrentCollection({
      ...currentCollection,
      [e.target.id]: e.target.value
    })
  }

  return (
    <MDBContainer>
      <MDBModal size="lg" isOpen={props.modal.isOpen} toggle={toggle}>
        <form>    
          <MDBModalHeader toggle={toggle}>
            <MDBInputGroup id="title" containerClassName="mb-3" onChange={handleChange} value={currentCollection.title} prepend="Title" hint="Title"/>
          </MDBModalHeader>
          <MDBModalBody>
            <EditPictures />
            <MDBInputGroup id="tags" containerClassName="mb-3" onChange={handleChange} value={(currentCollection.tags)?currentCollection.tags.join(' '):''} prepend="Tags" hint="Tags"/>
            <div id="input-description">
              <MDBInputGroup id="description" onChange={handleChange} value={currentCollection.description} prepend="Description" type="textarea"/>
            </div>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={toggle}>Close</MDBBtn>
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
    uploadedpictures: reduxState.uploadedpictures,
    uploadedTitlePic: reduxState.uploadedTitlePic
  }
}

export default connect(mapStateToProps)(EditModal)