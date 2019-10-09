import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import api from '../../api';
import Card from '../Card'
import EditModal from '../pages/EditModal'
import '../../styles/Home.css'
import greenBanner from '../../media/banner-greenfuture-1-1024x287.jpg'

function Home (props) {
  let { dispatch } = props;

  useEffect(() => {
    api.getCollections()
    .then(collections => dispatch({
      type: "GET_DATA", 
      collections
    })).catch (err => console.log(err))
  }, [dispatch])

  return (
    <div className="Home">
      <img className="banner" src={greenBanner} alt="green banner"/>
      <div className="gallery">
        {props.collections && props.collections.map((collection, i) => 
        <div key={collection._id}><Card collection={collection} dispatch={props.dispatch}/></div>)}
      </div>
      {props.modal.isOpen && props.modal.isEdit && <EditModal />}
    </div>
  );
}

function mapStateToProps(reduxState){
  return {
    collections: reduxState.collections,
    notifications: reduxState.notifications,
    modal: reduxState.modal
  }
}

export default connect(mapStateToProps)(Home)