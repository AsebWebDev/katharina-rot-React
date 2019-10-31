import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux';
import SlideModal from './Slider/SlideModal'
import Coverflow from 'react-coverflow'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { toggleModal } from '../../actioncreators'
import { calcCoverflow } from '../../helpers'
import api from '../../api';
import infografik1 from '../../media/infografik-ernährung1-ila1.jpg'
import infografik2 from '../../media/fossile-energie_rotwebseite_b.jpg'
import infografik3 from '../../media/Palmöl-Grafik1_rotwebseite-1024x962.jpg'
import infografik4 from '../../media/Kupfer-Grafik_rotwebseite-991x1024.jpg'
import infografik5 from '../../media/Boxenlaufstall_stand1806_ausschnitt-infografikseite-1024x725.jpg'
import infografik6 from '../../media/Boxenlaufstall_stand1806_rotwebseite.jpg'
import infografik7 from '../../media/Einführungsgrafik-1024x724.jpg'
import infografik8 from '../../media/Wohnen-1024x724.jpg'
import infografik9 from '../../media/infografikbild-komplett_kleinklein_quadrat-1024x1024.jpg'
import infografik10 from '../../media/nitrat-teaser-webseite3-1024x675.jpg'

import '../../styles/InformativeIllustration.scss'


function InformativeIllustration(props) {
    let { dispatch } = props;
    let parsedPictures = props.collections.map(item => item.titlePic)
    let [currentPic, setCurrentPic] = useState(null)
    const coverFlowMedia = {
        '@media (max-width: 361px)': {
            width: '20px',
            height: '300px'
        },
        '@media (max-width: 500px)': {
            width: '400px',
            height: '300px'
        },
        '@media (max-width: 900px)': {
            width: '350px',
            height: '300px'
        },
        '@media (min-width: 900px)': {
            width: '900px',
            height: '400px'
        }
    }
    const size = useWindowSize();

    useEffect(() => {
        api.getCollections()
        .then(collections => dispatch({
            type: "GET_DATA", 
            collections
        })).catch (err => console.log(err))
    }, [dispatch])


    // Hook
    function useWindowSize() {
        const isClient = typeof window === 'object';
    
        function getSize() {
        return {
            width: isClient ? window.innerWidth : undefined,
            height: isClient ? window.innerHeight : undefined
        };
        }
    
        const [windowSize, setWindowSize] = useState(getSize);
    
        useEffect(() => {
        if (!isClient) {
            return false;
        }
        
        function handleResize() {
            setWindowSize(getSize());
        }
    
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
        }, []); // Empty array ensures that effect is only run on mount and unmount
    
        return windowSize;
    }

    const handleClick = (e) => {
        e.preventDefault();
        setCurrentPic(e.target.src)
        // props.dispatch(toggleModal(props.modal))
    }

    return (
        <div id="InformativeIllustration">
            <div><img src={infografik1} alt="Infografik" id="infografik1"/></div>
            <div id="top">
                <img src={infografik2} alt="Infografik" id="infografik2"/>
                <div id="info-text">
                    <h3 className="title">Informatiove Illustration</h3>
                    <p>
                        Ob für Unternehmen, NGO’s, Medien oder Politik: Eine gute und ansprechende Vermittlung von Inhalten kann oft von wesentlicher Bedeutung sein.
                        Da die visuelle Wahrnehmung beim Menschen am Anfang der Informationsaufnahme steht, wird die Infografik sogar als eine der effektivsten 
                        Möglichkeiten gesehen, Sachinformationen schnell und einfach zu vermitteln. Sie strukturiert, visualisiert und vermittelt Dinge, zu denen die 
                        LeserIn vorher keinen Zugang hatte. Infografiken können sich auf das wesentliche reduzieren und Inhalte durch die <strong>Wechselwirkungen zwischen 
                        visuellem/emotionalem Eindruck und dem kommunizierenden Grafikanteil</strong> auf eine Weise veranschaulichen, die zu einem schnelleren Verständnis 
                        und zu einem gesteigerten Interesse am Thema führt. Laut einer Studie erinnern Menschen sich durchschnittlich zu etwa 10% an Gehörtes, 20% an 
                        Gelesenes und zu 80% an visuelle Eindrücke.
                    </p>
                    <p>
                        Ein inhaltlicher Schwerpunkt meiner Arbeit liegt daher auf der Erstellung von <strong>Infografiken und Illustrationen zum Zwecke 
                        der Wissensvermittlung</strong>. Ich bereite komplexe Themen gerne visuell so auf, dass sie leicht verständlich, ansprechend und schnell
                        erfassbar sind. Hierfür arbeite ich je nach Projekt sowohl mit klaren Vektorgrafiken, also auch malerisch und illustrativ. 
                        Wie Sie an den Beispielen unten sehen werden, können Informationen auf sehr unterschiedliche und vielfältige Weise visuell 
                        dargestellt werden.
                    </p>
                    <p><strong>Lassen Sie sich gerne von mir zu einer guten illustrativen Umsetzung Ihrer Themen beraten!</strong></p>
                    <p>Eine Auswahl meiner Arbeiten im Bereich der Informativen Illustration finden Sie hier:</p>
                </div>
                
            </div>
            <div id="middle">
                <div className="divider"><hr/><strong>Infografik Projekte</strong><hr/></div>
                <div id="coverflow">
                    {/* TODO: Make this part mobile friendly, dynamic to window size */}
                    <Coverflow
                        width={690}
                        height={400} //TODO: Mobile 280
                        displayQuantityOfSide={calcCoverflow(size.width)} // TODO: Mobile 0.7
                        navigation={false}
                        enableHeading={false}
                        media={coverFlowMedia}
                    >
                        <div
                        // onClick={(pic) => console.log(pic)}
                        // onKeyDown={() => fn()}
                        role="menuitem"
                        tabIndex="1"
                        >
                        {parsedPictures && 
                            <img
                            onClick={handleClick}
                            src={parsedPictures[0]}
                            alt='gallery'
                            style={{ display: 'block', width: '100%' }}
                        />
                        }
                        
                        </div>
                        {parsedPictures && parsedPictures
                            .slice(1,parsedPictures.length)
                            .map(pic => 
                            <img src={pic} onClick={handleClick} alt='gallery'/>
                            )}
                    </Coverflow>
                </div> 
            </div>
            <div id="bottom">
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="6"><img src={infografik3} alt="Infografik" className="infografik"/></MDBCol>
                        <MDBCol md="6"><img src={infografik4} alt="Infografik" className="infografik"/></MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6"><img src={infografik5} alt="Infografik" className="infografik"/></MDBCol>
                        <MDBCol md="6"><img src={infografik6} alt="Infografik" className="infografik"/></MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6"><img src={infografik7} alt="Infografik" className="infografik"/></MDBCol>
                        <MDBCol md="6"><img src={infografik8} alt="Infografik" className="infografik"/></MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6"><img src={infografik9} alt="Infografik" className="infografik"/></MDBCol>
                        <MDBCol md="6"><img src={infografik10} alt="Infografik" className="infografik"/></MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
            {props.modal && props.modal.isOpen && currentPic && <SlideModal img={currentPic} />}
        </div>
    )
}

function mapStateToProps(reduxState){
    return {
        collections: reduxState.collections,
        modal: reduxState.modal
    }
  }
  
export default connect(mapStateToProps)(InformativeIllustration)
