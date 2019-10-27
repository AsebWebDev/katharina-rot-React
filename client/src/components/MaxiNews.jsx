import React, {useState, useEffect} from 'react'
import TimeAgo from 'react-timeago'
import germanStrings from 'react-timeago/lib/language-strings/de'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import '../styles/MaxiNews.scss'

const formatter = buildFormatter(germanStrings)

export default function MaxiNews(props) {
    const {news,i} = props;
    let [expand, setExpand] = useState(false)
    
    const toggle = () => {
        setExpand(!expand)
    }

    const section = "section" + i
    const collapsible = section + " section collapsible"

    return (
        <div className="maxi-news2" onClick={toggle}>
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
                    {!expand &&<p className={collapsible}>{news.description.slice(0,300)}{news.description.length > 300 ? "..." : ""}</p>}
                    {expand &&<p className={section}>{news.description}</p>}
                </div>
            </div>
        </div>
    )
}
