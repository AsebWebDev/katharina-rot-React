import React, { Component } from 'react';
import { connect } from 'react-redux';
import api from '../../api';
import Card from '../Card'
import './Home.css'
import greenBanner from '../../media/banner-greenfuture-1-1024x287.jpg'

class Home extends Component {

  componentDidMount(){
    // GET ALL ART-DATA FROM BACKEND-DATABASE
    api.getCollections()
    .then(collections => this.props.dispatch({
      type: "GET_DATA", 
      collections
    })).catch (err => console.log(err))
  }

  render() {      
    return (
      <div className="Home">
        <img className="banner" src={greenBanner} alt="green banner"/>
        <div className="gallery">
          {this.props.collections && this.props.collections.map((collection, i) => 
          <div key={collection._id}><Card collection={collection} dispatch={this.props.dispatch}/></div>)}
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

export default connect(mapStateToProps)(Home)