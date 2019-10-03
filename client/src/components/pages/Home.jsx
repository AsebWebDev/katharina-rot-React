import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {

  render() {  
    console.log(this.props)  
    return (
      <div className="Home">
        <h2>Home</h2>
        {this.props.arts && this.props.arts.map((art, i) => <p key={i}>{art.title}</p>)}
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