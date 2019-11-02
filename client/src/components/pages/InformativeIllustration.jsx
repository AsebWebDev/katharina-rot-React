import React from 'react'
import Coverflow from '../CoverFlow'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { infoIlluMainText } from '../../texts/informative-illustration.jsx'
import { toggleModal } from '../../actioncreators'
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

export default function InformativeIllustration(props) {
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
                <Coverflow />               
            </div>
            <div id="bottom">
                <MDBContainer>
                    {InformativeIllustrationPictures(picArr)}
                </MDBContainer>
            </div>
        </div>
    )
}
