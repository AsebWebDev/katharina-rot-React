import React from 'react'
import { connect } from 'react-redux';
import {  MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBIcon, MDBView, MDBBtn } from "mdbreact";
import '../styles/MiniNews.scss'

function MiniNews(props) {
    return (
      <MDBCard className="my-5 px-1 pb-1" id="footer2">
      <MDBCardBody>
        <MDBRow>
          <MDBCol lg="3">
            <MDBView className="rounded z-depth-2 mb-lg-0 mb-1" hover waves>
              <img
                className="img-fluid"
                src="https://mdbootstrap.com/img/Photos/Others/img%20(27).jpg"
                alt=""
              />
              <a href="#!">
                <MDBMask overlay="white-slight" />
              </a>
            </MDBView>
          </MDBCol>
          <MDBCol lg="7" id="footer-news-info">
            <div id="footer-title-category">
            <a href="#!" className="green-text">
              <p className="font-weight-bold mb-1">
                <MDBIcon icon="utensils" className="pr-2" />
                Food     
              </p>
            </a>
            <strong>Title of the news</strong>
            </div>
            
            <p>
              by
              <a href="#!">
                <strong>Carine Fox</strong>
              </a>
              , 19/08/2018
            </p>
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </MDBCard>
    )
}

function mapStateToProps(reduxState){
    return {
      news: reduxState.news
    }
  }
  
export default connect(mapStateToProps)(MiniNews)