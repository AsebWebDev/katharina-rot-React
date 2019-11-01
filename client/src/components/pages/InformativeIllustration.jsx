import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux';
import SlideModal from './Slider/SlideModal'
import Coverflow from 'react-coverflow'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { calcCoverflow } from '../../helpers'
import { coverFlowMedia } from '../../configs/coverflow'
import { infoIlluMainText } from '../../texts/informative-illustration.jsx'
// import { toggleModal } from '../../actioncreators'
import useWindowSize from '../../hooks/useWindowSize.jsx'
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

let picArr = [infografik3, infografik4, infografik5, infografik6, infografik7, infografik8, infografik9, infografik10 ]

let InformativeIllustrationPictures = (picArr) => {
    let result = []
    let count = 0;
    while (count < picArr.length) {
        result.push(<MDBRow key={count}>
            <MDBCol md="6"><img src={picArr[count]} alt="Infografik" className="infografik"/></MDBCol>
            <MDBCol md="6"><img src={picArr[count+1]} alt="Infografik" className="infografik"/></MDBCol>
          </MDBRow>)
        count += 2;
    }
    return result
}

function InformativeIllustration(props) {
    let { dispatch } = props;
    let parsedPictures = props.collections.map(item => item.titlePic)
    let [currentPic, setCurrentPic] = useState(null)
    const size = useWindowSize();

    useEffect(() => {
        api.getCollections()
        .then(collections => dispatch({ type: "GET_DATA", collections}))
        .catch (err => console.log(err))
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
                    <h3 className="title">Informatiove Illustration</h3>
                    {infoIlluMainText}
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
                            .map((pic, i) => 
                            <img src={pic} onClick={handleClick} alt='gallery' key={i}/>
                            )}
                    </Coverflow>
                </div> 
            </div>
            <div id="bottom">
                <MDBContainer>
                    {InformativeIllustrationPictures(picArr)}
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
