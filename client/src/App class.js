import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Admin from './components/pages/Admin';
import Header from './components/Header';
import Notification from './components/Notification'
import './App.css';

class App extends Component {

  componentDidMount(){
    console.log("App mounted")
  }

  componentDidUpdate() {
    console.log("Component did update")
    console.log(this.props.notifications)
  }

  render() {
    console.log("App rendered")
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/admin" component={Admin} />
          <Route path="/login" component={Login} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
        <div style={{
                position: "fixed",
                top: "10px",
                right: "10px",
                zIndex: 9999
            }}>
            {this.props.notifications && !!this.props.notifications.length && <Notification notifications={this.props.notifications}/>}
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState){
  return {
    collections: reduxState.collections,
    notifications: reduxState.notifications
  }
}

export default connect(mapStateToProps)(App);