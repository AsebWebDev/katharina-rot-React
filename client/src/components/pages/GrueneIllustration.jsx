import React  from 'react'
import { MDBBtn } from "mdbreact";
import Coverflow from '../CoverFlow'
import banner from '../../media/banner-hambiwald-1024x164.jpg'
import erdeHand from '../../media/erde-hand-icon_400px-300x300.jpg'
import auge from '../../media/Auge_Icon_500px-1-300x300.jpg'
import pencil1 from '../../media/pflanzen-stift_icon-schmaler-300x300.jpg'
import pencil2 from '../../media/Stift2_icon_600px-300x300.jpg'
import spatz from '../../media/Spatz_ot-1500px-768x603.jpg'
import { text_erdeHand, text_eye, text_pencil1, text_pencil2 } from '../../texts/gruene-illustration.jsx'
import '../../styles/GrueneIllustration.scss'

export default function GrueneIllustration(props) {
    return (
        <div>
            <div id="gruene-illu-top">
                <img src={banner} alt="Banner"/>
                <h4 className="title">GRÜNE ILLUSTRATION</h4>
            </div>
            <div id="gruene-illu-middle">
                <div id="gruene-illu-left" className="gruene-illu-text">
                    <img src={erdeHand} alt="Erde Hand"/>
                    {text_erdeHand}
                    <img src={auge} alt="Erde Hand"/>
                    {text_eye}
                </div>
                <div id="gruene-illu-right" className="gruene-illu-text">
                    <img src={pencil1} alt="Erde Hand"/>
                    {text_pencil1}
                    <img src={pencil2} alt="Erde Hand"/>
                    {text_pencil2}
                    <MDBBtn outline color="success">KONTAKTIEREN SIE MICH HIER!</MDBBtn>
                </div>
            </div>
            <div id="gruene-illu-bottom">
                <div className="divider"><hr/><strong>Hier sehen Sie eine Auswahl meiner bisherigen grünen Projekte</strong><hr/></div>
                <Coverflow />
                <img id="spatz" src={spatz} alt="Spatz"/>
            </div>
        </div>
    )
}
