import React, { Component } from 'react';
import { NavLink, withRouter} from 'react-router-dom';
import api from '../api';


class Header extends Component {
  handleLogoutClick(e) {
    api.logout();
  }

  render() {
    return (
      <div>
          <h1 className="App-title">Katharina Rot</h1>
          <NavLink to="/">Home</NavLink>
          {api.isLoggedIn() && <NavLink to="/admin">Admin</NavLink>}
          {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
          {api.isLoggedIn() && <NavLink to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</NavLink>}
      </div>
    )
  }
}

export default withRouter(Header);