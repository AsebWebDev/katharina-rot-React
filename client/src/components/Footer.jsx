import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { MDBCol, MDBContainer, MDBRow, MDBFooter, MDBIcon } from "mdbreact";
import MiniNews from './MiniNews'
import Spinner from './Spinner'
import $ from "jquery";
import '../styles/Footer.scss'

const FooterPage = (props) => {
  let [nNewsMax, setNNewsMax] = useState(4); // maximum number of news to show
  
  useEffect(() => {
    $(window).resize(function(){
        if ($(window).width() > 1400) setNNewsMax(2)      // show only 2 news max
        else if ($(window).width() > 1080) setNNewsMax(3) // show only 3 news max
        else if ($(window).width() < 1080) setNNewsMax(4) // show 4 news max
    })
  }, [nNewsMax])


  return (
    <MDBFooter color="elegant-color" id="footer" className="font-small pt-5 mt-5 flex-column">
      <MDBContainer fluid className="text-center text-md-left flex-row">
        <MDBRow>
          <MDBCol md="4" className="mobile">
            <h5 className="footer-title">About</h5>
            <p>
            Sarah Heuzeroth ist Illustratorin aus Hamburg mit Schwerpunkt auf Wissenschaftsillustration und den Themenbereichen Nachhaltigkeit, Transformationsdesign, Natur und Tiere. Manchmal arbeitet sie auch unter dem Künstlernamen „Katharina Rot“.
            </p>
          </MDBCol>
          <MDBCol md="2" className="mobile">
            <h5 className="footer-title">Follow me</h5>
            <ul>
              <li className="list-unstyled">
                <a href="#!"><MDBIcon fab icon="facebook-square" /> Facebook</a>
              </li>
              <li className="list-unstyled">
                <a href="#!"><MDBIcon fab icon="instagram" /> Instagram</a>
              </li>
            </ul>
          </MDBCol>
          <MDBCol md="1" className="mobile">
            <h5 className="footer-title">Links</h5>
            <ul id="footer-links">
              <li className="list-unstyled">
                <a href="www.katharina-rot.de">Work</a>
              </li>
              <li className="list-unstyled">
                <a href="www.katharina-rot.de/news">News</a>
              </li>
              <li className="list-unstyled">
                <a href="www.katharina-rot.de/about">About</a>
              </li>
              <li className="list-unstyled">
                <a href="www.katharina-rot.de/contact">Contact</a>
              </li>
              <li className="list-unstyled">
                <a href="www.katharina-rot.de/agb">AGB</a>
              </li>
            </ul>
          </MDBCol>
          <MDBCol md="5" id="footer-news">
            <h5 className="footer-title">News</h5>
            {props.news && props.news.length > 0 && 
              <div>
                {props.news.slice(0,nNewsMax).map((news,i) => <MiniNews key={i} news={news} />)}
              </div>
            }
            {props.news && props.news.length === 0 && <Spinner />}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid className="flex-column">
          <div> &copy; 2014 - {new Date().getFullYear()} Copyright: </div>
          <a href="http://www.katharina-rot.de/"><span>Sarah Heuzeroth – green illustration for a better tomorrow</span></a>
          <a href="mailto:illustration@katharina-rot.de">illustration[at]katharina-rot.de</a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

function mapStateToProps(reduxState){
  return {
    news: reduxState.news
  }
}

export default connect(mapStateToProps)(FooterPage)
