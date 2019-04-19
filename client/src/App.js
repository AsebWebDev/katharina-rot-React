import React, { Component } from 'react';
import { Route, Link, NavLink, Switch } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Admin from './components/pages/Admin';
import Header from './components/Header';
import api from './api';
import './App.css';

class App extends Component {
  
  handleLogoutClick(e) {
    api.logout()
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/admin" component={Admin} />
          <Route path="/login" component={Login} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
