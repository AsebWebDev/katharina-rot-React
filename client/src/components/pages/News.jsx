import React from 'react'
import { connect } from 'react-redux';

function News(props) {
    return (
        <div>
            News
        </div>
    )
}

function mapStateToProps(reduxState){
    return {
      news: reduxState.news
    }
  }
  
  export default connect(mapStateToProps)(News)