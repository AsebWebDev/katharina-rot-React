import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Admin from './components/pages/Admin';
import Header from './components/Header';
import Footer from './components/Footer';
import Collection from './components/pages/Collection';
import Notification from './components/Notification'
import PortfolioPDF from './components/pages/PortfolioPDF'
import InformativeIllustration from './components/pages/InformativeIllustration'
import GrueneIllustration from './components/pages/GrueneIllustration'
import News from './components/pages/News'
import api from './api';
import './styles/App.scss';

// TODO: * Implement User-Settings

class App extends Component {

  componentDidMount(){
    api.getNews()
      .then(news => this.props.dispatch({
        type: "GET_NEWS", 
        news
      })).catch (err => console.log(err))
  }

  componentDidUpdate() {
    api.getNews()
      .then(news => this.props.dispatch({
        type: "GET_NEWS", 
        news
      })).catch (err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/admin" component={Admin} />
          <Route path="/login" component={Login} />
          <Route path="/portfoliopdf" component={PortfolioPDF} />
          <Route path="/informative-illustration" component={InformativeIllustration} />
          <Route path="/gruene-illustration" component={GrueneIllustration} />
          <Route path="/collection/:id" component={Collection} />
          <Route path="/news" component={News} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
        <Footer />
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
