import React, { useState } from 'react';
import { connect } from 'react-redux';
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import Create from './Create'
import '../../configs/cloudinary'
import api from '../../api';

function Admin (props){
  let [mode, setMode] = useState("default")

  let toggle = (choice) => {
    switch (choice) {
      case 'create': setMode('create'); break;
      default: console.log("Default")
    }
  }
  
  if (api.isLoggedIn()) {
    return (
    <div>
      <MDBContainer className="mt-5 text-center">
        <MDBRow>
          <MDBCol>
            <MDBJumbotron>
              <h2 className="h1 display-3">Hello, Sarah!</h2>
              <p className="lead">This is your admin page. Play around!</p>
              <hr className="my-2" />
              <p>Make a choice :)</p>
              <p className="lead">
                <MDBBtn color="primary" onClick={() => toggle('create')}>Create Collection</MDBBtn>
              </p>
            </MDBJumbotron>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      {(mode === "create") && <Create />}
      
    </div>
  )} else {
    props.history.push("/login") // Redirect to the login page
    return null
  }
}

function mapStateToProps(reduxState){
  return {
    collections: reduxState.collections,
    notifications: reduxState.notifications,
  }
}

export default connect(mapStateToProps)(Admin)