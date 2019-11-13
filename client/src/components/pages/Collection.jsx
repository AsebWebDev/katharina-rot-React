import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux';
import $ from "jquery";
import { MDBAnimation } from "mdbreact";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw } from 'draft-js';
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

  let redirect = () => props.history.push('/')
  
  if (currentCollection) {
    let { title, description, pictures, titlePic } = currentCollection;
    console.log(currentCollection.editorState)
    let editorState = currentCollection.editorState 
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(currentCollection.editorState)))
      : null
    console.log("TCL: editorState", editorState)
    let hasPictures = pictures.length > 0
    return (
      <div className="collection">
          <MDBAnimation type="slideInLeft"><div onClick={redirect} className="backBtn"><i className="fas fa-arrow-circle-left"></i></div></MDBAnimation>
          <p className="title">{title}</p>
          {!isFullScreen && hasPictures && 
              <div className="editor-content">
                <Editor 
                readOnly={true} 
                toolbarHidden
                editorState={editorState}
                />
              </div>}
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
                <div className="editor-content">
                  <Editor 
                  readOnly={true} 
                  toolbarHidden
                  editorState={editorState}
                  />
                </div>
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
