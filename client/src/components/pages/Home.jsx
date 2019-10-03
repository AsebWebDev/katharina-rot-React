import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '../Card'

class Home extends Component {

  render() {  
    return (
      <div className="Home">
        <h2>Home</h2>
        {this.props.arts && this.props.arts.map((art, i) => <Card key={art._id} art={art}/>)}
      </div>
    );
  }
}

function mapStateToProps(reduxState){
  return {
    arts: reduxState.arts
  }
}

export default connect(mapStateToProps)(Home)