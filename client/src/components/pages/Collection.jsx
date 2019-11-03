import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux';
import $ from "jquery";
import ParallaxLeft from '../CollectionParallaxLeft'
import ParallaxRight from '../CollectionParallaxRight'
import Slider from './Slider/Slider'
import SlideModal from './Slider/SlideModal'
import api from '../../api';
import { checkMobile, checkFullScreen } from '../../helpers'
import '../../styles/Collection.scss'

function Collection(props) {
  let [currentId] = useState(props.match.params.id)
  let [currentCollection, setCurrentCollection] = useState(null)
  let [parsedPictures, setParsedPictures] = useState([])
  let [error, setError] = useState(null)
  let [isMobile, setIsMobile] = useState(checkMobile())
  let [isFullScreen, setIsFullScreen] = useState(checkFullScreen())

  useEffect(() => {
    $(window).resize(function(){
      setIsMobile(checkMobile())
      setIsFullScreen(checkFullScreen())
    })
  }, [isMobile, isFullScreen])

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
  
  if (currentCollection) {
    let { title, description, pictures, titlePic } = currentCollection;
    let hasPictures = pictures.length > 0
    return (
      <div className="collection">
          <p className="title">{title}</p>
          {!isFullScreen && hasPictures && 
              <p>{description}</p>}
          {hasPictures && 
              <Slider heading="Example Slider" slides={parsedPictures} id={currentId} />}
          {!isMobile && hasPictures 
              && <Slider heading="Example Slider" slides={parsedPictures} id={currentId} /> 
              &&  <div id="plx-collection">
                    <div id="plx-left" className="plx">
                      <ParallaxLeft currentId={currentId}/>
                    </div>
                    {isFullScreen && <div id="plx-right" className="plx">
                      <ParallaxRight currentId={currentId}/>  
                    </div>}
                  </div>
          }
          {!hasPictures && 
              <div id="no-pictures-div">
                <img src={titlePic} alt="Titelbild"/>
                <p>{description}</p>
              </div>}
          {props.modal && props.modal.isOpen && hasPictures && 
              <SlideModal img={pictures[props.modal.currentIndex]} />}
      </div>
    )
  } else return (error && <p>{error}</p>)
}

function mapStateToProps(reduxState){
  return {
    collections: reduxState.collections,
    modal: reduxState.modal
  }
}
  
export default connect(mapStateToProps)(Collection)
