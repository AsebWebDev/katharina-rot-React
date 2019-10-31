import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux';
import SlideModal from './Slider/SlideModal'
import Coverflow from 'react-coverflow'
import { toggleModal } from '../../actioncreators'
import api from '../../api';
import infografik1 from '../../media/infografik-ernährung1-ila1.jpg'
import infografik2 from '../../media/fossile-energie_rotwebseite_b.jpg'
import '../../styles/InformativeIllustration.scss'


function InformativeIllustration(props) {
    let { dispatch } = props;
    let parsedPictures = props.collections.map(item => item.titlePic)
    let [currentPic, setCurrentPic] = useState(null)

    useEffect(() => {
        api.getCollections()
        .then(collections => dispatch({
            type: "GET_DATA", 
            collections
        })).catch (err => console.log(err))
    }, [dispatch])

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
                    <span className="title">Informatiove Illustration</span>
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
                        displayQuantityOfSide={4} // TODO: Mobile 0.7
                        navigation={false}
                        enableHeading={false}
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
