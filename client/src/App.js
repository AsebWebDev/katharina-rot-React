import React, {useEffect} from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Admin from './components/pages/Admin';
import Header from './components/Header';
import Footer from './components/Footer';
import Collection from './components/pages/Collection';
import NewsDetails from './components/pages/NewsDetails';
import Notification from './components/Notification'
import PortfolioPDF from './components/pages/PortfolioPDF'
import AboutMe from './components/pages/AboutMe'
import AGB from './components/pages/AGB'
import Contact from './components/pages/Contact'
import LiabilityAndCopyrights from './components/pages/LiabilityAndCopyrights'
import InformativeIllustration from './components/pages/InformativeIllustration'
import GrueneIllustration from './components/pages/GrueneIllustration'
import News from './components/pages/News'
import api from './api';
import './styles/App.scss';

// TODO: * Implement User-Settings

function App (props) {
  const { dispatch } = props;

  useEffect(() => {
    api.getNews()
      .then(news => dispatch({ type: "GET_NEWS", news}))
      .catch (err => console.log(err))
  }, [dispatch])

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/admin" component={Admin} />
        <Route path="/login" component={Login} />
        <Route path="/portfoliopdf" component={PortfolioPDF} />
        <Route path="/aboutme" component={AboutMe} />
        <Route path="/agb" component={AGB} />
        <Route path="/contact" component={Contact} />
        <Route path="/impressum" component={LiabilityAndCopyrights} />
        <Route path="/informative-illustration" component={InformativeIllustration} />
        <Route path="/gruene-illustration" component={GrueneIllustration} />
        <Route path="/collection/:id" component={Collection} />
        <Route path="/news/:id" component={NewsDetails} />
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
          {props.notifications && !!props.notifications.length && <Notification notifications={props.notifications}/>}
      </div>
    </div>
  );
}

function mapStateToProps(reduxState){
  return {
    collections: reduxState.collections,
    notifications: reduxState.notifications,
    news: reduxState.news,
  }
}

export default connect(mapStateToProps)(App);
