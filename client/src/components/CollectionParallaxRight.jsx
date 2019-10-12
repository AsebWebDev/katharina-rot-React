
import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux';
import Plx from "react-plx";
import api from '../api';
import { parallaxDataGalleryRight } from '../configs/parallax'
import '../styles/CollectionParallax.css'
  
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
    <div>
      <Plx 
        parallaxData={parallaxDataGalleryRight} 
        // style={style}
      >
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa porro sed quam tempore asperiores, vitae nisi, labore pariatur corporis architecto, sequi accusamus quisquam iure earum sunt molestiae fugiat eos animi?</p>
      </Plx>
    </div>
  );
}

function mapStateToProps(reduxState){
    return {
      collections: reduxState.collections,
    }
  }
  
export default connect(mapStateToProps)(CollectionParallaxRight)