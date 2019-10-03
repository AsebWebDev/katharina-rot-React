import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Admin from './components/pages/Admin';
import Header from './components/Header';
import api from './api';
import './App.css';

class App extends Component {

  //TODO: USE HOOKS TO AVOID LIFECYCLE-METHODS

  // componentDidMount(){
  //   // GET ALL ART-DATA FROM BACKEND-DATABASE
  //   api.getCollections()
  //   .then(collections => this.props.dispatch({
  //     type: "GET_DATA", 
  //     collections
  //   })).catch (err => console.log(err))
  // }
  
  render() {
    console.log("Props from app")
    console.log(this.props)
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

function mapStateToProps(reduxState){
  return {
    collections: reduxState.collections
  }
}

export default connect(mapStateToProps)(App);
