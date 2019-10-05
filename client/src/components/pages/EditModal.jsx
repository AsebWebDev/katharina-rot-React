import React from 'react';
import { connect } from 'react-redux';

import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

function EditModal(props) {

  console.log(props.modal.currentId)

  let toggle = (e) => {
    console.log(e.target.id)
    props.dispatch({
      type: "TOGGLE_EDIT_MODAL",
      modal: {
        isOpen: !props.modal.isOpen,
        isEdit: !props.modal.isEdit,
        currentId: (props.modal.isOpen) ? '' : props.modal.currentId // If modal is about to close, remove currentId
      }
    })
  }

  return (
    <MDBContainer>
      <MDBModal isOpen={props.modal.isOpen} toggle={toggle}>
        <MDBModalHeader toggle={toggle} name="close">MDBModal title</MDBModalHeader>
        <MDBModalBody>
          (...)
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" name="close" onClick={toggle}>Close</MDBBtn>
          <MDBBtn color="primary">Save changes</MDBBtn>
        </MDBModalFooter>
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