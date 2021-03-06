import React, { useState } from 'react'
import { connect } from 'react-redux';
import { MDBAnimation, MDBBadge, MDBNavLink, MDBBtn } from 'mdbreact';
import TimeAgo from 'react-timeago'
import germanStrings from 'react-timeago/lib/language-strings/de'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import Heart from './Heart'
import { newNotification, toggleModal } from '../actioncreators'
import api from '../api';
import '../styles/MaxiNews.scss'

const formatter = buildFormatter(germanStrings)

function MaxiNews(props) {
    const { dispatch, news, i } = props;
    const section = "section" + i
    const collapsible = section + " section collapsible"
    let [expand, setExpand] = useState(false)

    const toggle = () => { setExpand(!expand) }

    const handleDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();
        api.deleteNews(news._id)
        .then(result => {
            dispatch(newNotification(
                (result.success) 
                ? `Your News '${news.title}' has been deleted`
                : `Sorry, your News could not be deleted.`
                , 'Deleted'
            ))
            api.getNews()
                .then(news => dispatch({ type: "GET_NEWS", news}))
                .catch (err => console.log(err))
        }).catch(err => dispatch(newNotification(err.toString())));
    }

    const handleEdit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(toggleModal(props.modal, news._id, 0, "news"))
    }

    return (
        <div id="maxi-news" onClick={toggle}>
            <div id="maxi-news-delete">
                {api.isAdmin() && <MDBBadge onClick={handleDelete} color="danger"><i className="fas fa-trash-alt"></i>Delete</MDBBadge>}
                {api.isAdmin() && <MDBBadge onClick={handleEdit} color="blue"><i className="fas fa-edit"></i>Edit</MDBBadge>}
            </div>
            <div id="news-top">
                <img src={news.titlePic} alt="Title" />
                <div id="mini-data">
                    <p>by <a href="#!" className="font-weight-bold">Katharina Rot</a>, <span>{<TimeAgo date={news.created_at} formatter={formatter} />} </span></p>
                    <Heart target={{type: "News", targetId: news._id, likes: news.likedSessions.length}} />
                </div>
            </div>
            <div id="news-bottom">
                <div id="title"><strong>{news.title}</strong></div>
                <div id="description">
                    <div className={collapsible}>
                        {news.description && news.description.slice(0,300)}
                        {!expand && news.description && news.description.length > 300 
                            ? "..." 
                            : <MDBAnimation type="fadeIn">{news.description && news.description.slice(301,news.description.length)}</MDBAnimation>}
                    </div>
                </div>
                <MDBNavLink to={"/news/"+ news._id}><MDBBtn color="light">Details</MDBBtn></MDBNavLink>
            </div>
        </div>
    )
}

function mapStateToProps(reduxState){
    return {
        modal: reduxState.modal      
    }
}

export default connect(mapStateToProps)(MaxiNews)
