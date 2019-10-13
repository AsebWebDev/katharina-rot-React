
import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux';
import Plx from "react-plx";
import api from '../api';
import { parallaxDataGalleryRight } from '../configs/parallax'
import '../styles/CollectionParallax.scss'
  
function CollectionParallaxRight(props) {

  let [currentId] = useState(props.currentId)
  let [currentCollection, setCurrentCollection] = useState(null)
  // eslint-disable-next-line
  let [error, setError] = useState(null)

  useEffect(() => {
    api.getOneCollection(currentId)
    .then(result => setCurrentCollection(result.collection))
    .catch (err => setError(err))
  }, [currentId])

  return (
    <Plx 
      parallaxData={parallaxDataGalleryRight} 
      // style={style}
    >
    <div className="flex">
      <div id="plx-description">
        {currentCollection && <p>{currentCollection.description}</p>}
      </div>
    </div>
    </Plx>
  );
}

function mapStateToProps(reduxState){
    return {
      collections: reduxState.collections,
    }
  }
  
export default connect(mapStateToProps)(CollectionParallaxRight)