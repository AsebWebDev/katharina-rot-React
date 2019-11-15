import React, {useState, useEffect} from 'react'
import $ from "jquery";
import { MDBAnimation } from "mdbreact";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw } from 'draft-js';
import CollectionParallax from '../ParallaxGalleryLeft'
import Slider from './Slider/Slider'
import SlideModal from './Slider/SlideModal'
import { checkMobile, checkFullScreen } from '../../helpers'
import api from '../../api';
import '../../styles/NewsDetails.scss'
import '../../styles/Editor.scss'

export default function NewsDetails(props) {
    let [currentId] = useState(props.match.params.id)
    let [currentNews, setCurrentNews] = useState(null)
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
        api.getOneNews(currentId)
        .then(result => setCurrentNews(result.news))
        .catch (err => setError(err))
    }, [currentId])

    useEffect(() => {
        let parsedPictures = [];
        if (currentNews && currentNews.pictures) parsedPictures = parseDataForSlider(currentNews.pictures, currentId)
        setParsedPictures(parsedPictures)
    }, [setParsedPictures, currentNews, currentId])

    let parseDataForSlider = (array, id) => {
        return array.map((img,i) => ({
          index: i,
          id,
          headline: '',
          button: '',
          src: img
        })
    )}
    
    let redirect = () => props.history.push('/news')

    if (currentNews) {
        console.log("TCL: currentNews", currentNews)
        let { title, description, pictures, titlePic } = currentNews;
        let editorState = currentNews.editorState 
            ? EditorState.createWithContent(convertFromRaw(JSON.parse(currentNews.editorState)))
            : null
        let hasPictures = pictures.length > 0
        
        return (
        <div className="news">
            <MDBAnimation type="slideInLeft"><div onClick={redirect} className="backBtn"><i className="fas fa-arrow-circle-left"></i></div></MDBAnimation>
            <p className="title">{title}</p>
            <p className="description">{description}</p>

            {/* Show only when gallery exists */}
            {hasPictures && 
                <div >
                    <Slider className="slider" heading="Example Slider" slides={parsedPictures} id={currentId} type="news"/>
                    <div id="plx-news">
                    {isFullScreen && <div className="news-left">
                            <CollectionParallax currentId={currentId} type="news"/>
                    </div>}
                    {!isFullScreen && !isMobile && <div className="news-left">
                            {pictures.map((pic,i) => <img src={pic} key={i} alt="gallery"/>)}
                    </div>}
                    <div className="news-right">
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
