import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux';
// import SimplaxTest from '../SimplaxTest2'
import Slider from './SlideTest/Slider'
import api from '../../api';

function Collection(props) {
  let [currentId] = useState(props.match.params.id)
  let [currentCollection, setCurrentCollection] = useState(null)
  let [parsedPictures, setParsedPictures] = useState([])
  let [error, setError] = useState(null)

  useEffect(() => {
    api.getOneCollection(currentId)
    .then(result => setCurrentCollection(result.collection))
    .catch (err => setError(err))
  }, [currentId])

  useEffect(() => {
   let parsedPictures = [];
   if (currentCollection && currentCollection.pictures) parsedPictures = parseDataForSlider(currentCollection.pictures)
   setParsedPictures(parsedPictures)
  }, [setParsedPictures, currentCollection])

  let parseDataForSlider = array => {
    return array.map((img,i) => ({
      index: i,
      headline: '',
      button: '',
      src: img
    })
  )}
  
  if (currentCollection)
    return (
      <div>
                {/* <div style={{ 
            width: "20vw",
            height: "100vh",
            borderRight: "2px solid black",
            position: "fixed",
            // top: "30vh",
            top: 0,
            left: 10
        }}/> */}
          <p>{currentCollection.title}</p>
          {currentCollection && currentCollection.pictures.length > 0 && <Slider heading="Example Slider" slides={parsedPictures} />}
          {/* <SimplaxTest currentId={currentId}/> */}
          {/* {currentCollection.pictures.length > 0 && currentCollection.pictures.map((img,i) => <img key={i} src={img} alt="art"/>)} */}
      </div>
    )
  else return (error && <p>{error}</p>)
}

function mapStateToProps(reduxState){
    return {
      collections: reduxState.collections,
    }
  }
  
export default connect(mapStateToProps)(Collection)
