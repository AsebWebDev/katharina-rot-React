import React from 'react'
import {  MDBRow, MDBCol, MDBMask, MDBIcon, MDBView, MDBBtn } from "mdbreact";
import TimeAgo from 'react-timeago'
import germanStrings from 'react-timeago/lib/language-strings/de'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import '../styles/MaxiNews2.scss'

const formatter = buildFormatter(germanStrings)

export default function MaxiNews(props) {
    const {news} = props;
    return (
        <div className="maxi-news2">
            <div id="news-top">
                <img src={news.titlePic} alt="Title" />
                <div id="mini-data">
                    <p>by <a href="#!" className="font-weight-bold">Katharina Rot</a>, <span>{<TimeAgo date={news.created_at} formatter={formatter} />} </span></p>
                    <p id="heart">heart</p>
                </div>
            </div>
            <div id="news-bottom">
                <div id="title"><strong>{news.title}</strong></div>
                <div id="description">
                    <p>{news.description.slice(0,300)}{news.description.length > 300 ? "..." : ""}</p>
                </div>
            </div>

        </div>
    )
}
