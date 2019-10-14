import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInputGroup } from 'mdbreact';
import { toggleModal, setUploadedPics, newNotification } from '../../actioncreators'
import EditPictures from './EditPictures'
import InputTag from '../InputTag'
import api from '../../api';
import '../../styles/EditModal.css'

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

  let updateTags = (newTags) => {
    setCurrentCollection({
      ...currentCollection,
      tags: newTags  
    })
  }

  let handleSubmit = (e) => {
    e.preventDefault();
    let body = {
      ...currentCollection,
      pictures: props.uploadedPictures ? props.uploadedPictures : currentCollection.pictures, // use uploaded pictures if exists
      titlePic: props.uploadedTitlePic ? props.uploadedTitlePic : currentCollection.titlePic // use uploaded Titlepic if exists
    }
    api.updateCollection(currentId, body)
      .then(result => {
        dispatch({ type: "GET_DATA", collections: result.collections })
        dispatch(newNotification(`Your Collection '${currentCollection.title}' has been updated.`, 'Updated'))
      }).catch (err => console.log(err))
    dispatch(setUploadedPics(null,null)) //clear uploaded pictures after successfull submit
    toggle();
  }

  let handleChange = (e) => {
    setCurrentCollection({
      ...currentCollection,
      [e.target.id]: (e.target.id==="tags") 
                        ? e.target.value.split(' ') // turn input value into array
                        : e.target.value        
    })
  }

  let handleclose = () => {
    dispatch(setUploadedPics(null,null)) //clear uploaded pictures after cancelling
    toggle()
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
            {currentCollection && currentCollection.tags && <InputTag id="input-tag" tags={currentCollection.tags} updateTags={updateTags}/>}
            <div id="input-description">
              <MDBInputGroup id="description" onChange={handleChange} value={currentCollection.description} prepend="Description" type="textarea"/>
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