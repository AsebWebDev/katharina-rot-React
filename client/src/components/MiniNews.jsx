import React from 'react'
import {  MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBIcon, MDBView, MDBContainer,  MDBBtn } from "mdbreact";
import TimeAgo from 'react-timeago'
import germanStrings from 'react-timeago/lib/language-strings/de'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import '../styles/MiniNews.scss'

const formatter = buildFormatter(germanStrings)

function MiniNews(props) {
    let news = props.news;
    console.log("TCL: MiniNews -> news", news)
    
    return (
      <MDBCard className="my-5 px-1 pb-1" id="mini-news">
      <MDBCardBody>
      <MDBContainer>
        <MDBRow>
          <MDBCol size="3" className="flex-row">
            <MDBView className="rounded z-depth-2 mb-lg-0 mb-1" hover waves>
              <img className="img-fluid" src={news.thumbnail} alt=""/>
              <a href="#!"><MDBMask overlay="white-slight" /></a>
            </MDBView>
          </MDBCol>
          <MDBCol size="7" id="footer-news-info">
            <div id="footer-title-category">
            <a href="#!" className="green-text">
              <p className="font-weight-bold mb-1">
                <MDBIcon icon="newspaper" className="pr-2" />
                {news.category}   
              </p>
            </a>
            <strong>{news.title.slice(0,22)}{news.title.length > 22 ? "..." : ""}</strong>
            </div>
            
            <p>
              <span>by</span>
              <a href="#!">
                <strong>Katharina Rot</strong>
              </a>
              , {<TimeAgo date={news.created_at} formatter={formatter} />}   
            </p>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      </MDBCardBody>
    </MDBCard>
    )
}

export default MiniNews