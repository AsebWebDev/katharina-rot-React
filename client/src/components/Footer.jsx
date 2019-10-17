import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter, MDBIcon } from "mdbreact";
import '../styles/Footer.css'

const FooterPage = () => {
  return (
    <MDBFooter color="black" id="footer" className="font-small pt-5 mt-5">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
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
          <MDBCol md="3">
            <h5 className="footer-title">Links</h5>
            <ul>
              <li className="list-unstyled">
                <a href="#!">Link 1</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 2</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 3</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 4</a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="http://www.katharina-rot.de/"> Sarah Katharina Heuzeroth </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPage;