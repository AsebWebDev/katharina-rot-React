import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { newNotification } from '../actioncreators'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import GoogleLogin from 'react-google-login';
// import keys from '../configs/keys';
import api from '../api';
import '../styles/LoginBox.scss'

function LoginBox(props) {
  const { dispatch } = props;
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  let [message, setMessage] = useState('');
  let [profilePic, setProfilePic] = useState(null);
  const handleInputChange = (stateFieldName, event) => {
    switch (stateFieldName) {
      case 'username': setUsername(event.target.value); break;
      case 'password': setPassword(event.target.value); break;
      case 'message': setMessage(event.target.value); break;
      case 'profilePic': setMessage(event.target.value); break;
      default: return
    }
  }

  const handleClick = (e) => {
    e.preventDefault();
    api.login(username, password)
      .then(() => {
        api.getUserSettings(api.getLocalStorageUser()._id)
        .then(settings => dispatch({ type: "UPDATE_USER_SETTINGS", settings}))
        .catch(err => dispatch(newNotification(err.toString())))
      })
      .then(() => {
        dispatch(newNotification('Successfully logged in, ' +  username))
        props.history.push("/") // Redirect to the home page
      }).catch(err => setMessage(err))
  }

  const responseOauth = (response) => {
    const googleId = response.googleId;
    const username = response.profileObj.name;
    const profilePic = response.profileObj.imageUrl;
    setUsername(username);
    setProfilePic(profilePic);
    api.googleLogin(googleId, username, profilePic)
    .then(result => {
      dispatch(newNotification('Successfully logged in, ' +  username))
      let userdata = { username, profilePic }
      props.dispatch({ type: "UPDATE_USER_DATA", userdata })
      props.history.push("/") // Redirect to the home page
    }).catch(err => setMessage(err))
  }

  return (
    <MDBContainer id="loginbox">
      <MDBRow>
        <MDBCol md="12">
          <form onSubmit={(e) => handleClick(e)}>
            <p className="h5 text-center mb-4">Please login...</p>
            <div className="grey-text">
              <MDBInput
                className="loginbox-credentials"
                label="Type your username"
                icon="user"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                value={username}
                onChange={(e) => handleInputChange("username", e)}
              />
              <MDBInput
                className="loginbox-credentials"
                label="Type your password"
                icon="lock"
                group
                type="password"
                validate
                value={password}
                onChange={(e) => handleInputChange("password", e)}
              />
            </div>
            <div className="text-center">
              <MDBBtn type="submit">Login</MDBBtn>
            </div>
            {message && <h2>{message}</h2>}
          </form>
          {/* GOOGLE OAUTH */}
          <hr />
          <p className="h5 text-center mb-4">Or use your Google account...</p>
          <GoogleLogin
            // clientId={keys.google.GOOGLE_CLIENTID}
            clientId={process.env.REACT_APP_GOOGLE_CLIENTID}
            buttonText="Google Login"
            onSuccess={responseOauth}
            onFailure={responseOauth}
            cookiePolicy={'single_host_origin'}
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

function mapStateToProps(reduxState){
  return {
    username: reduxState.username,
    profilePic: reduxState.profilePic
  }
}

export default withRouter(connect(mapStateToProps)(LoginBox))
