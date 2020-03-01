import React from 'react';
import '../styles/Instastory.scss'
import instastory2_2 from '../media/InstaStory/Instastory2-2.jpg'
import instastory3_2 from '../media/InstaStory/Instastory3-2.jpg'
import instastory4_2 from '../media/InstaStory/Instastory4-2.jpg'
import instastory6_2 from '../media/InstaStory/Instastory6-2.jpg'
import instastory7_2 from '../media/InstaStory/Instastory7-2.jpg'

export default function InstaStory() {
    return (
        <div id="instastory">
            <img src={instastory2_2} alt="instastory"/>
            <img src={instastory3_2} alt="instastory"/>
            <img src={instastory4_2} alt="instastory"/>
            <img src={instastory6_2} alt="instastory"/>
            <img src={instastory7_2} alt="instastory"/>
        </div>
    )
}
