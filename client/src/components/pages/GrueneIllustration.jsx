import React from 'react'
import banner from '../../media/banner-hambiwald-1024x164.jpg'
import erdeHand from '../../media/erde-hand-icon_400px-300x300.jpg'
import auge from '../../media/Auge_Icon_500px-1-300x300.jpg'
import { text_erdeHand2 } from '../../texts/gruene-illustration.jsx'
import '../../styles/GrueneIllustration.scss'

export default function GrueneIllustration() {
    return (
        <div>
            <div id="gruene-illu-top">
                <img src={banner} alt="Banner"/>
                <h4 className="title">GRÜNE ILLUSTRATION</h4>
            </div>
            <div id="gruene-illu-middle">
                <div id="gruene-illu-left">
                    <img src={erdeHand} alt="Erde Hand"/>
                    {/* <p>{text_erdeHand}</p> */}
                    {text_erdeHand2}
                </div>
                <div id="gruene-illu-right">
                    <img src={auge} alt="Erde Hand"/>
                </div>
            </div>
        </div>
    )
}
