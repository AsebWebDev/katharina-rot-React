import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import GoogleLogin from 'react-google-login';
import keys from '../configs/keys';
import api from '../api';

function LoginBox(props) {

  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  let [message, setMessage] = useState(null);
  
  const handleInputChange = (stateFieldName, event) => {
    switch (stateFieldName) {
      case 'username': setUsername(event.target.value); break;
      case 'password': setPassword(event.target.value); break;
      case 'message': setMessage(event.target.value); break;
      default: return
    }
  }

  const handleClick = (e) => {
    e.preventDefault();
    api.login(username, password)
      .then(result => {
        setMessage('Success!')
        props.history.push("/") // Redirect to the home page
      }).catch(err => setMessage(err))
  }

  const responseOauth = (response) => {
    const googleId = response.googleId;
    const username = response.profileObj.name;
    setUsername(username);
    api.googleLogin(googleId, username)
    .then(result => {
      setMessage('Success!')
      props.history.push("/") // Redirect to the home page
    }).catch(err => setMessage(err))
  }

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="12">
          <form onSubmit={(e) => handleClick(e)}>
            <p className="h5 text-center mb-4">Please provide your credentials to login...</p>
            <div className="grey-text">
              <MDBInput
                label="Type your username"
                icon="envelope"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                value={username}
                onChange={(e) => handleInputChange("username", e)}
              />
              <MDBInput
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
          {/* <a href="http://localhost:5000/api/oauth/googlelogin"><button>Login with Google</button></a> */}
          <GoogleLogin
            clientId={keys.google.GOOGLE_CLIENTID}
            buttonText="Login"
            onSuccess={responseOauth}
            onFailure={responseOauth}
            cookiePolicy={'single_host_origin'}
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

export default withRouter(LoginBox)