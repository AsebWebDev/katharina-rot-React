import React, { Component } from 'react'

export default class Header extends Component {
  render() {
    return (
      <div>
        <h1>header</h1>
        {/* <header className="App-header">
          <h1 className="App-title">Katharina Rot</h1>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/admin">Admin</NavLink>
          {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
          {api.isLoggedIn() && <Link to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link>}
        </header> */}
      </div>
    )
  }
}
