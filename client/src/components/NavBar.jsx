import React, { useState } from "react";
import { connect } from 'react-redux';
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";
import { withRouter} from 'react-router-dom';
import api from '../api';


function NavbarPage (props) {
    let [isOpen, setIsOpen] = useState(false)

let toggleCollapse = () => {
  setIsOpen(!isOpen)
}

let handleLogoutClick= (e) => {
    api.logout()
    api.getCollections()
      .then(collections => props.dispatch({
        type: "GET_DATA", 
        collections
      })).catch (err => console.log(err))
  }

  return (
      <MDBNavbar  light expand="md">
        <MDBNavbarBrand>
          <strong className="black-text">Katharina Rot</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem>
              <MDBNavLink to="/">Aktuelles</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <span className="mr-2">Portfolio</span>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem href="#!">Übersicht</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Portfolio PDF</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Informative Illustration</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <span className="mr-2">About</span>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem href="#!">Über mich</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Grüne Illustration</MDBDropdownItem>
                  <MDBDropdownItem href="#!">AGB</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <span className="mr-2">Contact</span>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem href="#!">Contact</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Impressum / Legals</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
            <MDBNavItem>
             {!api.isLoggedIn() && <MDBNavLink to="/login">Login</MDBNavLink>}
             {api.isLoggedIn() && <MDBNavLink to="/" onClick={handleLogoutClick}>Logout</MDBNavLink>}
            </MDBNavItem>
            <MDBNavItem>
              {api.isLoggedIn() && <MDBNavLink to="/admin">Admin</MDBNavLink>}
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBFormInline waves>
                <div className="md-form my-0">
                  <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                </div>
              </MDBFormInline>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
}

function mapStateToProps(reduxState){
    return {
      collections: reduxState.collections,
      notifications: reduxState.notifications
    }
  }
  
// export default connect(mapStateToProps)(Home)

export default withRouter(connect(mapStateToProps)(NavbarPage))