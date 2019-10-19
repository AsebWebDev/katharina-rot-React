import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter, MDBIcon } from "mdbreact";
import FooterNewsBlock from './FooterNewsBlock'
import '../styles/Footer.css'

const FooterPage = () => {
  return (
    <MDBFooter color="black" id="footer" className="font-small pt-5 mt-5">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="4">
            <h5 className="footer-title">About</h5>
            <p>
            Sarah Heuzeroth ist Illustratorin aus Hamburg mit Schwerpunkt auf Wissenschaftsillustration und den Themenbereichen Nachhaltigkeit, Transformationsdesign, Natur und Tiere. Manchmal arbeitet sie auch unter dem Künstlernamen „Katharina Rot“.
            </p>
          </MDBCol>
          <MDBCol md="3">
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
          <MDBCol md="2">
            <h5 className="footer-title">Links</h5>
            <ul>
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
          <MDBCol md="3">
            <h5 className="footer-title">News</h5>
            <FooterNewsBlock />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="http://www.katharina-rot.de/"> Sarah Katharina Heuzeroth // illustration[at]katharina-rot.de</a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPage;