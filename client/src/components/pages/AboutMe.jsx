import React from 'react'
import portraitImg from '../../media/portrait_ich_kl-1-768x971.jpg'
import portraitImg2 from '../../media/portrait_kl_rotwebseite_3-2-768x957.jpg'
import portraitImg3 from '../../media/image-8-rotwebseite-600x600.jpg'
import portraitImg4 from '../../media/bild2-768x511.jpg'

import { section1a_text, section1b_text, customer_list, vita, publications, exhibitions } from '../../texts/aboutme.jsx'
import '../../styles/AboutMe.scss'

export default function AboutMe(props) {
    const redirect = () => props.history.push('/gruene-illustration')

    return (
        <div id="about-me">
            <div className="section1">
                <div className="section1-left">
                    <img src={portraitImg} alt="portrait"/>
                </div>
                <div className="section1-right">
                    <h5 className="aboutme-title"><span>Wer bin ich </span><span>– und was ich anbiete</span></h5><hr/>
                    {section1a_text}
                </div>
            </div>
            <div className="section1">
                <div className="section1-left">
                    <img src={portraitImg2} alt="portrait"/>
                </div>
                <div className="section1-right">
                    <h5 className="aboutme-title">Für eine grüne Welt</h5><hr/>
                    {section1b_text}
                    <strong onClick={redirect}>-> Lesen Sie hier mehr über Grüne Illustration. </strong>
                </div>
            </div>
            <div className="section2">
                <div className="section2-left">
                    <h5 className="aboutme-title">Kunden (Auswahl)</h5><hr/>
                    {customer_list}
                    <img src={portraitImg3} alt="portrait"/>
                </div>
                <div className="section2-right">
                    <h5 className="aboutme-title">Vita</h5><hr/>
                    {vita}
                    <h5 className="aboutme-title">Veröffentlichungen</h5><hr/>
                    {publications}
                    <h5 className="aboutme-title">Ausstellungen</h5><hr/>
                    {exhibitions}
                    <img src={portraitImg4} alt="portrait"/>
                </div>
            </div>
        </div>
    )
}
