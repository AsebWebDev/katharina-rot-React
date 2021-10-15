import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { MDBAnimation } from "mdbreact";
import { isInQuery } from '../../helpers'
import Card from '../Card'
import InstaStory from '../InstaStory'
import EditModal from './EditModal'
import LoadingInfo from '../LoadingInfo';
import api from '../../api';
import '../../styles/Home.css'
import greenBanner from '../../media/banner-greenfuture-1-1024x287.jpg'

function Home (props) {
  const { dispatch, query } = props;

  useEffect(() => {
    api.getCollections()
    .then(collections => dispatch({
      type: "GET_DATA", 
      collections
    })).catch (err => console.log(err))
  }, [dispatch])

  const queryExists = props.query.length > 0;
  const filteredCollection = props.collections.filter(item => isInQuery(item, query))
  const filteredCollectionExists = filteredCollection.length > 0;

  return (
    <div className="Home">
      <MDBAnimation type="fadeIn" delay="0.3s">
        <img className="banner" src={greenBanner} alt="green banner"/>
      </MDBAnimation>
      <div className="gallery">

        {/* DATA EXISTS */}
          {/* QUERY EXISTS */}
          {filteredCollection.length === 0 && queryExists && 
            <LoadingInfo 
              title="Sorry"
              text="Ihre Suche ergab leider keine Ergebnisse."
              hasSpinner={false}
            />
          }   
      
          {/* NO QUERY EXISTS */}
          {filteredCollectionExists && filteredCollection
          .filter(item => isInQuery(item, query))
          .map((collection, i) => 
          <div key={collection._id}><Card collection={collection} dispatch={props.dispatch}/></div>)}   

        {/* NO DATA & NO QUERY EXISTS */}
        { !filteredCollectionExists && !queryExists && 
          <LoadingInfo 
            title="Loading content"
            text="No data is yet provided, still loading..."
            hasSpinner={true}
          />
        }
      </div>
      <InstaStory />
      {props.modal.isOpen && <EditModal />}
    </div>
  );
}

function mapStateToProps(reduxState){
  return {
    collections: reduxState.collections,
    notifications: reduxState.notifications,
    modal: reduxState.modal,
    query: reduxState.query
  }
}

export default connect(mapStateToProps)(Home)