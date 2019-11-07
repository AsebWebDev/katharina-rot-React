import React from 'react'
import ContactImg from '../../media/Contact-Icon-500px-1-300x300.jpg'
import '../../styles/Contact.scss'

export default function Contact() {
    return (
        <div id="contact">
            <img src={ContactImg} alt="letter"/>
            <p id="contact-title"><strong>Kontakt // Get in touch</strong></p>

            <p>
                <em>Haben Sie eine Anfrage für eine Illustration oder ein gemeinsames Projekt? Oder einfach eine Frage oder Anmerkung?</em><br/>
                <strong>Ich freue mich von Ihnen zu hören!</strong>
            </p>

            <p>→ Contact me via E-Mail:<br/><span><strong>illustration[at]sarah-heuzeroth.de</strong></span></p>

            <p>→ Follow me on 
                <span>
                    <strong><a href="https://www.facebook.com/katharinarotillustration"> Facebook </a></strong>
                </span> or 
                <span>
                    <strong><a href="https://www.instagram.com/sarahrot"> Instagram </a></strong>
                </span>
            </p>

            <p>→ Or call me: <span>+49 (0) 15174401842</span></p>
        </div>
    )
}
