import React from 'react'
import infografik1 from '../../media/infografik-ernährung1-ila1.jpg'
import infografik2 from '../../media/fossile-energie_rotwebseite_b.jpg'
import '../../styles/InformativeIllustration.scss'


export default function InformativeIllustration() {
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

            </div>
            <div id="bottom">

            </div>
        </div>
    )
}
