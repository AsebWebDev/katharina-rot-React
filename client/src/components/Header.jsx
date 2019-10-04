import React from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter} from 'react-router-dom';
import api from '../api';


function Header (props) {

  let handleLogoutClick= (e) => {
    api.logout()
    api.getCollections()
      .then(collections => props.dispatch({
        type: "GET_DATA", 
        collections
      })).catch (err => console.log(err))
  }

    return (
      <div>
          <h1 className="App-title">Katharina Rot</h1>
          <NavLink to="/">Home</NavLink>
          {api.isLoggedIn() && <NavLink to="/admin">Admin</NavLink>}
          {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
          {api.isLoggedIn() && <NavLink to="/" onClick={handleLogoutClick}>Logout</NavLink>}
      </div>
    )
}

function mapStateToProps(reduxState){
  return {
    collections: reduxState.collections,
    notifications: reduxState.notifications
  }
}

export default withRouter(connect(mapStateToProps)(Header));