import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux';
import $ from "jquery";
import { MDBAnimation } from "mdbreact";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw } from 'draft-js';
import CollectionParallax from '../ParallaxGalleryLeft'
import Slider from './Slider/Slider'
import SlideModal from './Slider/SlideModal'
import api from '../../api';
import { checkMobile, checkFullScreen } from '../../helpers'
import '../../styles/Collection.scss'
import '../../styles/Editor.scss'

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

  let redirect = () => props.history.push('/')
  
  if (currentCollection) {
    let { title, description, pictures, titlePic } = currentCollection;
    let editorState = currentCollection.editorState 
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(currentCollection.editorState)))
      : null
    let hasPictures = pictures.length > 0
    return (
      <div className="collection">
          <MDBAnimation type="slideInLeft"><div onClick={redirect} className="backBtn"><i className="fas fa-arrow-circle-left"></i></div></MDBAnimation>
          <p className="title">{title}</p>
          <p className="description">{description}</p>

          {/* Show only when gallery exists */}
          {hasPictures && 
              <div >
                <Slider className="slider" heading="Example Slider" slides={parsedPictures} id={currentId} type="collection"/>
                <div id="plx-collection">
                  {isFullScreen && <div className="collection-left">
                        <CollectionParallax currentId={currentId} type="collection"/>
                  </div>}
                  {!isFullScreen && !isMobile && <div className="collection-left">
                        {pictures.map((pic,i) => <img src={pic} key={i} alt="gallery"/>)}
                  </div>}
                  <div className="collection-right">
                    <div className="editor-content">
                      <Editor 
                      readOnly={true} 
                      toolbarHidden
                      editorState={editorState}
                      />
                    </div>      
                  </div>
                </div>
              </div>
          }
          
          {/* Show this, when no gallery exists */}
          {!hasPictures && 
              <div id="no-pictures-div">
                <img src={titlePic} alt="Titelbild"/>
                <div className="editor-content">
                  <Editor 
                  readOnly={true} 
                  toolbarHidden
                  editorState={editorState}
                  />
                </div>
              </div>}
          
          {/* Modal, when clicked on gallery picture */}
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
