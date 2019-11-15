
import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux';
import Plx from "react-plx";
import api from '../api';
import { parallaxDataGalleryLeft } from '../configs/parallax'
import '../styles/ParallaxGalleryLeft.scss'
  
function ParallaxGalleryLeft(props) {

  let [currentId] = useState(props.currentId)
  let [currentTarget, setCurrentTarget] = useState(null)
  // eslint-disable-next-line
  let [error, setError] = useState(null)
  let type = props.type
  let count = (currentTarget) ? currentTarget.pictures.length : null;

  useEffect(() => {
    (type === "collection")                                     // Call one Collection
    ?   api.getOneCollection(currentId)
        .then(result => setCurrentTarget(result.collection))
        .catch (err => setError(err))
    :   api.getOneNews(currentId)                               // Else call one News
        .then(result => setCurrentTarget(result.news))
        .catch (err => setError(err))
  }, [currentId, type])

  return (
    <div>
          {currentTarget && currentTarget.pictures.map((pic,i) => {
            let style = { zIndex: count, position: "relative", height: "70vh" }
            count-- //set Index - 1 to let the next one overlap this instance
            return (<Plx key={i} parallaxData={parallaxDataGalleryLeft} style={style}><img alt="art" src={pic} width="400vw"/></Plx>)
          })}
    </div>
  );
}

function mapStateToProps(reduxState){
    return {
      collections: reduxState.collections,
    }
  }
  
export default connect(mapStateToProps)(ParallaxGalleryLeft)