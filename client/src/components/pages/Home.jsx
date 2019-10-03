import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '../Card'

class Home extends Component {

  render() {  
    console.log(this.props)
    return (
      <div className="Home">
        <h2>Home</h2>
        {this.props.collections && this.props.collections.map((collection, i) => <Card key={collection._id} collection={collection}/>)}
      </div>
    );
  }
}

function mapStateToProps(reduxState){
  return {
    collections: reduxState.collections
  }
}

export default connect(mapStateToProps)(Home)