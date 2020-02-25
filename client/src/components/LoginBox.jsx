import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import api from '../api';

class LoginBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      message: null
    }
  }
  
  handleInputChange(stateFieldName, event) {
    this.setState({
      [stateFieldName]: event.target.value
    })
  }

  handleClick(e) {
    e.preventDefault();
    api.login(this.state.username, this.state.password)
      .then(result => {
        this.setState({ message: 'Success!' })
        this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => this.setState({ message: err }))
  }

  render() {
    return (
      <MDBContainer>
            <MDBRow>
              <MDBCol md="12">
                <form onSubmit={(e) => this.handleClick(e)}>
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
                      value={this.state.username}
                      onChange={(e) => this.handleInputChange("username", e)}
                    />
                    <MDBInput
                      label="Type your password"
                      icon="lock"
                      group
                      type="password"
                      validate
                      value={this.state.password}
                      onChange={(e) => this.handleInputChange("password", e)}
                    />
                  </div>
                  <div className="text-center">
                    <MDBBtn type="submit">Login</MDBBtn>
                  </div>
                  {this.state.message && <h2>{this.state.message}</h2>}
                </form>
                {/* GOOGLE OAUTH */}
                <a href="http://localhost:5000/api/oauth/googlelogin"><button>Login with Google</button></a>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
    )
  }
}

export default withRouter(LoginBox)