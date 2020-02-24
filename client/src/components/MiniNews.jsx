import React, { useState, useEffect } from "react";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBIcon, MDBView, MDBContainer } from "mdbreact";
import { withRouter } from 'react-router-dom';
// import history from '../configs/history';
import Heart from './Heart'
import TimeAgo from 'react-timeago'
import germanStrings from 'react-timeago/lib/language-strings/de'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import '../styles/MiniNews.scss'

const formatter = buildFormatter(germanStrings)

function MiniNews(props) {
    let news = props.news;  
    let redirect = () => props.history.push('/news/'+news._id)

    return (
      <MDBCard onClick={redirect} className="my-5 px-1 pb-1 hoverable" id="mini-news">
        <MDBCardBody>
          <MDBContainer>
            <MDBRow>
              <MDBCol size="3" className="flex-row">
                <MDBView className="rounded z-depth-2 mb-lg-0 mb-1" hover waves>
                  <img className="img-fluid" src={news.titlePic} alt=""/>
                  <a href="#!"><MDBMask overlay="white-slight" /></a>
                </MDBView>
              </MDBCol>
              <MDBCol size="9" id="footer-news-info">
                <div id="footer-title-category">
                <a href="#!" className="green-text">
                  <p className="font-weight-bold mb-1">
                    <MDBIcon icon="newspaper" className="pr-2" />
                    {news.category}   
                  </p>
                </a>
                <Heart target={{type: "News", targetId: news._id, likes: news.likedSessions.length}} />
                </div>
                {/* TODO: Make function for string trunc */}
                <strong>{news.title.slice(0,27)}{news.title.length > 27 ? "..." : ""}</strong>
                <div>
                  <div>
                    <span>by</span>
                    <a href="#!">
                      <strong>Katharina Rot</strong>
                    </a>
                  </div>
                  <div>
                    {<TimeAgo date={news.created_at} formatter={formatter} />}   
                  </div>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBCardBody>
      </MDBCard>
    )
}

export default withRouter(MiniNews)