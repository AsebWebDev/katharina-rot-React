import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { MDBJumbotron, MDBContainer, MDBAnimation } from "mdbreact";
import Card from '../Card'
import EditModal from './EditModal'
import Spinner from '../Spinner'
import api from '../../api';
import '../../styles/Home.css'
import greenBanner from '../../media/banner-greenfuture-1-1024x287.jpg'

function Home (props) {
  let { dispatch, query } = props;

  useEffect(() => {
    api.getCollections()
    .then(collections => dispatch({
      type: "GET_DATA", 
      collections
    })).catch (err => console.log(err))
  }, [dispatch])

  let isInQuery = (item) => ( item.title && item.title.toLowerCase().includes(query.toLowerCase()) ) // check title for query 
        || ( item.tags  && item.tags.map(item => item.toLowerCase()).includes(query.toLowerCase()) ) // check tags for query
  
  return (
    <div className="Home">
      <MDBAnimation type="fadeIn" delay="0.3s">
        <img className="banner" src={greenBanner} alt="green banner"/>
      </MDBAnimation>
      <div className="gallery">

        {/* DATA EXISTS */}
        {props.collections && props.collections
        .filter(item => isInQuery(item))
        .map((collection, i) => 
        <div key={collection._id}><Card collection={collection} dispatch={props.dispatch}/></div>)}

        {/* NO DATA EXISTS */}
        { props.collections && props.collections.length === 0 &&
          <MDBJumbotron className="jumbo-spinner" fluid>
            <MDBContainer>
              <h2 className="display-4">Loading content</h2>
              <p className="lead">No data is yet provided, still loading...</p>
              <Spinner />
            </MDBContainer>
          </MDBJumbotron>}
          
      </div>
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