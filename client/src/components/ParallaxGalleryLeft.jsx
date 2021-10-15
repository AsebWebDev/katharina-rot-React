
import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux';
import Plx from "react-plx";
import api from '../api';
import { parallaxDataGalleryLeft } from '../configs/parallax'
import '../styles/ParallaxGalleryLeft.scss'
  
function ParallaxGalleryLeft(props) {

  const [currentId] = useState(props.currentId)
  const [currentTarget, setCurrentTarget] = useState(null)
  // eslint-disable-next-line
  const [error, setError] = useState(null)
  const type = props.type
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
            const style = { zIndex: count, position: "relative", height: "70vh" }
            count-- //set Index - 1 to const the next one overlap this instance
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