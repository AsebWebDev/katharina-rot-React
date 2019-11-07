import React, { useState } from "react";
import { connect } from 'react-redux';
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";
import { withRouter } from 'react-router-dom';
import { updateQuery } from '../actioncreators'
import api from '../api';
import '../styles/NavBar.css'

function NavbarPage (props) {
  let [isOpen, setIsOpen] = useState(false)
  let { dispatch } = props;

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

  let handleChange = (e) => {
    dispatch(updateQuery(e.target.value))
  }

  return (
    <MDBNavbar light expand="md">
      <MDBNavbarBrand>
        <MDBNavLink to="/"><strong className="black-text">Katharina Rot</strong></MDBNavLink>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={toggleCollapse} />
      <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
        <MDBNavbarNav left>
          <MDBNavItem>
            <MDBNavLink to="/news">News</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <span className="mr-2">Portfolio</span>
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem ><MDBNavLink to="/">Übersicht</MDBNavLink></MDBDropdownItem>
                <MDBDropdownItem ><MDBNavLink to="/portfoliopdf">Portfolio PDF</MDBNavLink></MDBDropdownItem>
                <MDBDropdownItem><MDBNavLink to="/informative-illustration">Informative Illustration</MDBNavLink></MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>
          <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <span className="mr-2">About</span>
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem ><MDBNavLink to="/aboutme">Über mich</MDBNavLink></MDBDropdownItem>
                <MDBDropdownItem ><MDBNavLink to="/gruene-illustration">Grüne Illustration</MDBNavLink></MDBDropdownItem>
                <MDBDropdownItem ><MDBNavLink to="/agb">AGB</MDBNavLink></MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>
          <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <span className="mr-2">Contact</span>
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem ><MDBNavLink to="/contact">Contact</MDBNavLink></MDBDropdownItem>
                <MDBDropdownItem ><MDBNavLink to="/">Impressum / Legals</MDBNavLink></MDBDropdownItem>
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
                <input onChange={handleChange} className="searchbar form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
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
    notifications: reduxState.notifications,
    query: reduxState.query
  }
}

export default withRouter(connect(mapStateToProps)(NavbarPage))