import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux';
import ParallaxLeft from '../CollectionParallaxLeft'
import ParallaxRight from '../CollectionParallaxRight'
import Slider from './Slider/Slider'
import SlideModal from './Slider/SlideModal'
import api from '../../api';
import '../../styles/Collection.css'

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
   if (currentCollection && currentCollection.pictures) parsedPictures = parseDataForSlider(currentCollection.pictures, currentId)
   setParsedPictures(parsedPictures)
  }, [setParsedPictures, currentCollection, currentId])

  let parseDataForSlider = (array, id) => {
    return array.map((img,i) => ({
      index: i,
      id,
      headline: '',
      button: '',
      src: img
    })
  )}
  
  if (currentCollection)
    return (
      <div className="collection">
          <p className="title">{currentCollection.title}</p>
          {currentCollection && currentCollection.pictures.length > 0 && <Slider heading="Example Slider" slides={parsedPictures} id={currentId} />}
          <div id="plx-collection">
            <div id="plx-left" className="plx">
              <ParallaxLeft currentId={currentId}/>
            </div>
            <div id="plx-right" className="plx">
              <ParallaxRight currentId={currentId}/>  
            </div>
          </div>
          {props.modal && props.modal.isOpen && currentCollection.pictures && <SlideModal img={currentCollection.pictures[props.modal.currentIndex]} />}
      </div>

    )
  else return (error && <p>{error}</p>)
}

function mapStateToProps(reduxState){
  return {
    collections: reduxState.collections,
    modal: reduxState.modal
  }
}
  
export default connect(mapStateToProps)(Collection)
