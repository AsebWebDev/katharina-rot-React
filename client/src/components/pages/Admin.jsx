import React, { useState } from 'react';
import { connect } from 'react-redux';
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBIcon, MDBAnimation } from "mdbreact";
import CreateCollection from './CreateCollection'
import CreateNews from './CreateNews'
import Preferences from './Preferences'
import '../../configs/cloudinary'
import api from '../../api';
import '../../styles/Admin.css'

function Admin (props){
  let [mode, setMode] = useState("default")
  
  let toggle = (choice) => {
    if (mode === choice) choice = "default"
    switch (choice) {
      case 'createCollection': setMode('createCollection'); break;
      case 'createNews': setMode('createNews'); break;
      case 'preferences': setMode('preferences'); break;
      case 'default': setMode('default'); break;
      default: console.log("Default")
    }
  }
  
  if (api.isAdmin()) {
    return (
    <div className="admin-page">
      <MDBContainer className="main-menu mt-5 text-center">
        <MDBRow>
          <MDBCol>
            <MDBJumbotron className="main-jumbo">
              {(mode === "default") && <MDBAnimation type="fadeIn">
                <h2 className="h1 display-3">Hello Sarah!</h2>
                <p className="lead">This is your admin page. Play around!</p>
                <hr className="my-2" />
                <p>Make a choice :)</p>
              </MDBAnimation>}
              <p className="lead">
                <MDBBtn color="primary" onClick={() => toggle('createCollection')}><MDBIcon far icon="plus-square" />Create Collection</MDBBtn>
                <MDBBtn color="info" onClick={() => toggle('createNews')}><MDBIcon far icon="plus-square" />Create News</MDBBtn>
                <MDBBtn color="secondary" onClick={() => toggle('preferences')}><MDBIcon icon="tools" />Preferences</MDBBtn>
              </p>
            </MDBJumbotron>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      {(mode === "createCollection") && <CreateCollection />}
      {(mode === "createNews") && <CreateNews />}
      {(mode === "preferences") && <Preferences />}
      {(mode === "default") && <div />}
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