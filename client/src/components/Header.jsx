import React, { Component } from 'react';
import { Link, NavLink, withRouter} from 'react-router-dom';
import api from '../api';


class Header extends Component {
  handleLogoutClick(e) {
    api.logout();
    this.props.history.push("/") // Redirect to the home page
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
export default  withRouter(Header)