
import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux';
import Plx from "react-plx";
import api from '../api';
import { parallaxDataGalleryLeft } from '../configs/parallax'
import '../styles/CollectionParallax.scss'
  
function CollectionParallaxLeft(props) {

  let [currentId] = useState(props.currentId)
  let [currentCollection, setCurrentCollection] = useState(null)
  // eslint-disable-next-line
  let [error, setError] = useState(null)
  let count = (currentCollection)?currentCollection.pictures.length:null;

  useEffect(() => {
    api.getOneCollection(currentId)
    .then(result => setCurrentCollection(result.collection))
    .catch (err => setError(err))
  }, [currentId])

  return (
    <div>
          {currentCollection && currentCollection.pictures.map(pic => {
            let style = { zIndex: count, position: "relative", height: "70vh" }
            count-- //set Index - 1 to let the next one overlap this instance
            return (<Plx parallaxData={parallaxDataGalleryLeft} style={style}><img alt="art" src={pic} width="400vw"/></Plx>)
          })}
    </div>
  );
}

function mapStateToProps(reduxState){
    return {
      collections: reduxState.collections,
    }
  }
  
export default connect(mapStateToProps)(CollectionParallaxLeft)