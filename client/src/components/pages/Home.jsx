import React, { Component } from 'react';
import { connect } from 'react-redux';
import api from '../../api';
import Card from '../Card'
import './Home.css'

class Home extends Component {

  componentDidMount(){
    console.log(this.props)
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
        <h2>Home</h2>
        <div className="gallery">
          {this.props.collections && this.props.collections.map((collection, i) => 
          <div><Card key={collection._id} collection={collection} dispatch={this.props.dispatch}/></div>)}
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