import React from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../../../actioncreators'
import { MDBContainer, MDBModal } from 'mdbreact';
import '../../../styles/SlideModal.css'

function SlideModal (props) {

  let toggle = () => {
    props.dispatch(toggleModal(props.modal))
  }

  return (
    <MDBContainer>
      <MDBModal size="fluid" isOpen={props.modal.isOpen} toggle={toggle}>
        <div className="imgbox">
          <img className="center-fit" onClick={toggle} alt="" src={props.img} />    
        </div>
      </MDBModal>
    </MDBContainer>
    );
}

function mapStateToProps(reduxState){
  return {
    modal: reduxState.modal
  }
}

export default connect(mapStateToProps)(SlideModal)