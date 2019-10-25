import React from 'react'
import {  MDBRow, MDBCol, MDBMask, MDBIcon, MDBView, MDBBtn } from "mdbreact";
import TimeAgo from 'react-timeago'
import germanStrings from 'react-timeago/lib/language-strings/de'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import '../styles/MaxiNews.scss'

const formatter = buildFormatter(germanStrings)

export default function MaxiNews(props) {
    const {news, i} = props;


    const bigPart = (<MDBCol lg="7">
                        <MDBView className="rounded z-depth-2 mb-lg-0 mb-4" hover waves>
                        <img className="img-fluid" src={news.titlePic} alt={news.title} />
                        <a href="#!"><MDBMask overlay="white-slight" /></a>
                        </MDBView>
                    </MDBCol>)

    const smallPart = (<MDBCol lg="5">
                        <a href="#!" className="green-text">
                            <h6 className="font-weight-bold mb-3">
                                <MDBIcon icon="newspaper" className="pr-2" />
                                {news.category}
                            </h6>
                        </a>
                        <h3 className="font-weight-bold mb-3 p-0">
                            <strong>{news.title}</strong>
                        </h3>
                        <p>{news.description}</p>
                        <p>
                            <span>by</span> 
                            <a href="#!"><strong>Katharina Rot</strong></a>
                            <span>{<TimeAgo date={news.created_at} formatter={formatter} />} </span> 
                        </p>
                        <MDBBtn color="success" size="md" className="waves-light ">
                        Read more
                        </MDBBtn>
                    </MDBCol>)

    return (i % 2 === 0) 
    ? (
        <div id="maxi-news">
            <MDBRow>
                {bigPart}
                {smallPart}
            </MDBRow>
            <hr className="my-5" />
        </div>
    )
    : (
        <div id="maxi-news">
            <MDBRow>
            {smallPart}
            {bigPart}
            </MDBRow>
            <hr className="my-5" />
        </div>
    )
}
