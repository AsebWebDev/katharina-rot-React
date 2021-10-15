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
  const [currentId] = useState(props.match.params.id)
  const [useParallax, setUseParallax] = useState(null)
  const [useSildeGallery, setUseSildeGallery] = useState(null)
  const [currentCollection, setCurrentCollection] = useState(null)
  const [parsedPictures, setParsedPictures] = useState([])
  const [error, setError] = useState(null)
  const [isMobile, setIsMobile] = useState(checkMobile())
  const [isFullScreen, setIsFullScreen] = useState(checkFullScreen())


  useEffect(() => {
    if (props.userSettings) {
      setUseParallax(props.userSettings.Effects.parallax.val)
      setUseSildeGallery(props.userSettings.Effects.slideGallery.val)
    }
  }, [props.userSettings])

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

  const parseDataForSlider = (array, id) => {
    return array.map((img,i) => ({
      index: i,
      id,
      headline: '',
      button: '',
      src: img
    })
  )}

  const redirect = () => props.history.push('/')
  
  if (currentCollection) {
    const { title, description, pictures, titlePic } = currentCollection;
    const editorState = currentCollection.editorState 
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(currentCollection.editorState)))
      : null
    const hasPictures = pictures.length > 0
    return (
      <div className="collection">
          <MDBAnimation type="slideInLeft"><div onClick={redirect} className="backBtn"><i className="fas fa-arrow-circle-left"></i></div></MDBAnimation>
          {/* Show only when Slider is activated in preferences */}
          { useSildeGallery && 
            <div>
              <p className="title">{title}</p> 
              <p className="description">{description}</p>
            </div>
          }

          {/* Show only when gallery exists */}
          {hasPictures && 
              <div >
                { useSildeGallery && <Slider className="slider" heading="Example Slider" slides={parsedPictures} id={currentId} type="collection"/> }
                <div id="plx-collection">
                  {isFullScreen && useParallax && <div className="collection-left-with-plx">
                        <CollectionParallax currentId={currentId} type="collection"/>
                  </div>}
                  { ( (!isFullScreen && !isMobile) || !useParallax ) && <div className="collection-left">
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
    modal: reduxState.modal,
    userSettings: reduxState.userSettings
  }
}
  
export default connect(mapStateToProps)(Collection)
