import React from 'react';
import { connect } from 'react-redux';

import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

function EditModal(props) {

  let toggle = () => {
    props.dispatch({
      type: "TOGGLE_EDIT_MODAL",
      modal: {
        isOpen: !props.modal.isOpen,
        isEdit: !props.modal.isEdit
      }
    })
  }

  console.log("Aus Modal Page")
  console.log("props Modal open:")
  console.log(props.modal.isOpen)

  return (
    <MDBContainer>
      <MDBModal isOpen={props.modal.isOpen} toggle={toggle}>
        <MDBModalHeader toggle={toggle}>MDBModal title</MDBModalHeader>
        <MDBModalBody>
          (...)
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={toggle}>Close</MDBBtn>
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