import React from 'react'
import { MDBView } from "mdbreact";
import porfolioPDFimg from '../../media/portfolio_titel-768x289.png'
import '../../styles/PortfolioPDF.css'

export default function PortfolioPDF() {
    return (
        <div id="portfolioPDF" >
                <h5><strong>Kleines Portfolio mit einer Auswahl aktueller Arbeiten (PDF, 10 MB):</strong></h5>
                <MDBView  hover zoom>
                    <img href="" src={porfolioPDFimg} alt="portfolio pdf"  />
                </MDBView>
                <i>Copyrighthinweis: Alle Urheber- und anderen Rechte am gesamten Inhalt des Portfolios bleiben ausschließlich und umfassend Sarah Katharina Heuzeroth vorbehalten. Durch den Download des Portfolios zu Ansichtszwecken werden dem Benutzer/ der Benutzerin keine Rechte am Inhalt eingeräumt. Jede weitere Verwendung des Portfolios oder einzelnen Inhaltes aus dem Portfolio, beispielsweise das Reproduzieren oder Veröffentlichen, ist untersagt und ausschließlich mit vorheriger, schriftlicher Zustimmung gestattet. </i>
        </div>
    )
}
