import React, { Component } from 'react';
import { Link, NavLink} from 'react-router-dom';
import api from '../api';


export default class Header extends Component {
  handleLogoutClick(e) {
    api.logout()
  }

  render() {
    return (
      <div>
          <h1 className="App-title">Katharina Rot</h1>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/admin">Admin</NavLink>
          {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
          {api.isLoggedIn() && <Link to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link>}
      </div>
    )
  }
}
