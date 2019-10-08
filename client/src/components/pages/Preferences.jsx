import React, { } from 'react';
import { connect } from 'react-redux';

function Preferences(props) {

    return (
        <div>
            <p>preferences</p>
        </div>
    )
}

function mapStateToProps(reduxState){
    return {
      collections: reduxState.collections,
      notifications: reduxState.notifications,
    }
}
  
export default connect(mapStateToProps)(Preferences)
