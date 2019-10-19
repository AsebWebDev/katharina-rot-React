import React from 'react'
// import { connect } from 'react-redux';
import {  MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBIcon, MDBView, MDBBtn } from "mdbreact";
import '../styles/MiniNews.scss'


function MiniNews(props) {
    let news = props.news;
    console.log("TCL: MiniNews -> news", news)
    return (
      <MDBCard className="my-5 px-1 pb-1" id="footer2">
      <MDBCardBody>
        <MDBRow>
          <MDBCol lg="3">
            <MDBView className="rounded z-depth-2 mb-lg-0 mb-1" hover waves>
              <img className="img-fluid" src={news.thumbnail} alt=""/>
              <a href="#!"><MDBMask overlay="white-slight" /></a>
            </MDBView>
          </MDBCol>
          <MDBCol lg="7" id="footer-news-info">
            <div id="footer-title-category">
            <a href="#!" className="green-text">
              <p className="font-weight-bold mb-1">
                <MDBIcon icon="newspaper" className="pr-2" />
                {news.category}   
              </p>
            </a>
            <strong>{news.title}</strong>
            </div>
            
            <p>
              by
              <a href="#!">
                <strong>Katharina Rot</strong>
              </a>
              , 19/08/2018
            </p>
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </MDBCard>
    )
}

// function mapStateToProps(reduxState){
//     return {
//       news: reduxState.news
//     }
//   }
  
// export default connect(mapStateToProps)(MiniNews)
export default MiniNews