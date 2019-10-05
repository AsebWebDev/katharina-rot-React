import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';

import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import api from '../../api';

function EditModal(props) {
  console.log(props.modal.currentId)
  let currentId = props.modal.currentId;
  let [currentCollection, setCurrentCollection] = useState({})

  useEffect(() => {
    console.log("Use effect called")
    // BACKEND REQUEST AND SET DATA TO STATE
    api.getOneCollection(currentId)
    .then(res => setCurrentCollection(res.collection))
    .catch (err => console.log(err))
  }, [currentId])

  let toggle = (e) => {
    console.log(e.target.id)
    props.dispatch({
      type: "TOGGLE_EDIT_MODAL",
      modal: {
        isOpen: !props.modal.isOpen,
        isEdit: !props.modal.isEdit,
        currentId: (props.modal.isOpen) ? '' : props.modal.currentId // If modal is about to close, removegit  currentId
      }
    })
  }

  let handleSubmit = () => {
    console.log("Handle Submit clicked")
  }

  console.log(currentCollection)
  return (
    <MDBContainer>
      <MDBModal isOpen={props.modal.isOpen} toggle={toggle}>
        <form onSubmit={handleSubmit}>    
          <MDBModalHeader toggle={toggle}><input value={currentCollection.title} /></MDBModalHeader>
          <MDBModalBody>
            (...)
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={toggle}>Close</MDBBtn>
            <MDBBtn color="primary">Save changes</MDBBtn>
          </MDBModalFooter>
        </form>
      </MDBModal>
    </MDBContainer>
  );
}


function mapStateToProps(reduxState){
  return {
    modal: reduxState.modal
  }
}

export default connect(mapStateToProps)(EditModal)