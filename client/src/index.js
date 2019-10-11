import React from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './styles/index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';
import rootReducer from './reducer/rootReducer';
import { Provider } from 'react-redux';
import { ParallaxProvider } from 'react-scroll-parallax';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
<Provider store={store}>
  <Router>
  <ParallaxProvider>
    <App />
    </ParallaxProvider>
  </Router>
</Provider>
, document.getElementById('root'));