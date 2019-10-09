import React from 'react';
import NavBar from './NavBar'
import logo from '../media/Logo_800pxbreit-1.jpg'
import '../styles/Header.css'

function Header () {

    return (
      <div className="header">
          <img src={logo} alt="" width="400"/>
          <NavBar />
      </div>
    )
}

export default Header