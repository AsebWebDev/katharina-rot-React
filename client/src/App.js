import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Admin from './components/pages/Admin';
import Header from './components/Header';
import Collection from './components/pages/Collection';
import Notification from './components/Notification'
import './styles/App.css';

// TODO: * Implement User-Settings

class App extends Component {

  componentDidMount(){
  }

  componentDidUpdate() {
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/admin" component={Admin} />
          <Route path="/login" component={Login} />
          <Route path="/collection/:id" component={Collection} />
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
