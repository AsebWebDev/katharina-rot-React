import React from 'react'
import {  MDBRow, MDBCol, MDBMask, MDBIcon, MDBView, MDBBtn } from "mdbreact";
import TimeAgo from 'react-timeago'
import germanStrings from 'react-timeago/lib/language-strings/de'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import '../styles/MaxiNews.scss'

const formatter = buildFormatter(germanStrings)

export default function MaxiNews(props) {
    const {news} = props;
    return (
        <div className="maxi-news">
            <MDBRow>
                <MDBCol lg="5" xl="4">
                    <MDBView hover className="rounded z-depth-1-half mb-lg-0 mb-4">
                    <img
                        className="img-fluid"
                        src={news.titlePic}
                        alt={news.title}
                    />
                    <a href="#!">
                        <MDBMask overlay="white-slight" />
                    </a>
                    </MDBView>
                </MDBCol>
                <MDBCol lg="7" xl="8">
                <h3 className="font-weight-bold mb-3 p-0">
                    <strong>{news.title}</strong>
                </h3>
                <p className="dark-grey-text">
                    {news.description}
                </p>
                <p>
                    by <a href="#!" className="font-weight-bold">Katharina Rot</a>, <span>{<TimeAgo date={news.created_at} formatter={formatter} />} </span> 
                </p>
                <MDBBtn color="primary" size="md">
                    Read More
                </MDBBtn>
                </MDBCol>
            </MDBRow>
            <hr className="my-5" />
        </div>
    )
}
