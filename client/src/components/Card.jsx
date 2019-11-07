import React, { useState } from 'react'
import { connect } from 'react-redux';
import ReactCardFlip from 'react-card-flip';
import Heart from './Heart'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBNavLink, MDBBadge, MDBView, MDBIcon} from 'mdbreact';
import { newNotification, toggleModal } from '../actioncreators'
import { calcFont } from '../helpers'
import api from '../api';
import '../styles/Card.scss'

const Card = function (props) {

    let maxTextSize = 140;
    let {title, titlePic, description, tags, _id, likedSessions} = props.collection;
    let [isFlipped, setIsFlipped] = useState(false);
    let {dispatch} = props;

    let handleDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();
        api.deleteCollection(_id)
        .then(result => {
            dispatch(newNotification(
                (result.success) 
                ? `Your Collection '${title}' has been deleted`
                : `Sorry, your Collection could not be deleted.`
                , 'Deleted'
            ))
            api.getCollections()
                .then(collections => dispatch({ type: "GET_DATA", collections }))
                .catch (err => console.log(err))
        }).catch(err => dispatch(newNotification(err.toString())));
    }
    
    let handleClick = (e) => {
        e.preventDefault();
        setIsFlipped(!isFlipped)
    }

    let handleTagClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const tagId = e.target.getAttribute('id');
        const tagName = e.target.getAttribute('name');
        tags.splice(tagId,1)
        let body = { ...props.collection, tags}
        api.updateCollection(_id, body)
        .then(result => {
            dispatch({ type: "GET_DATA", collections: result.collections })
            dispatch(newNotification(`Your Tag '${tagName}' has been removed from collection '${title}' .`, 'Updated'))
        }).catch (err => console.log(err))
    }

    let handleEdit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(toggleModal(props.modal, _id))
    }

    return (
        <div id="card">
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <MDBCol key="front" onClick={handleClick}>
                <MDBCard style={{ width: "15rem", height: "26rem" }}>
                    <MDBView hover zoom>
                        <MDBCardImage className="img-fluid" src={titlePic} waves />
                        <div className="card-buttons">
                            {api.isLoggedIn() && <MDBBadge onClick={handleDelete} color="danger"><i className="fas fa-trash-alt"></i>Delete</MDBBadge>}
                            {api.isLoggedIn() && <MDBBadge onClick={handleEdit} color="blue"><i className="fas fa-edit"></i>Edit</MDBBadge>}
                        </div>
                    </MDBView>
                    <MDBCardBody>
                        <MDBCardTitle>
                            <Heart target={{type: "Collection", targetId: _id, likes: likedSessions.length}} />
                            <div style={{ fontSize: calcFont(title.length) }} className="title">{title}</div>
                        </MDBCardTitle>
                        <MDBNavLink to={"/collection/"+ _id}><MDBBtn color="light">Details</MDBBtn></MDBNavLink>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>

            <MDBCol key="back" onClick={handleClick}>
                <MDBCard style={{ width: "15rem", height: "26rem" }}>
                    <div className="card-buttons">
                        {api.isLoggedIn() && <MDBBadge onClick={handleDelete} color="danger"><i className="fas fa-trash-alt"></i>Delete</MDBBadge>}
                        {api.isLoggedIn() && <MDBBadge onClick={handleEdit} color="blue"><i className="fas fa-edit"></i>Edit</MDBBadge>}
                    </div>
                    <MDBCardBody>
                        <MDBCardTitle>
                            <Heart target={{type: "Collection", targetId: _id, likes: likedSessions.length}} />     
                            {title}
                        </MDBCardTitle>
                        <MDBCardText>
                            {description.slice(0,maxTextSize)}{description.length > maxTextSize && "..."}
                        </MDBCardText>
                        <div className="tags">
                            {tags.map((tag,i) => 
                                <div>
                                    <MDBBadge key={i} color="info" >
                                        {api.isLoggedIn() && 
                                            <span className="x">
                                                <MDBIcon onClick={handleTagClick} id={i} name={tag} icon="trash-alt" />
                                            </span>}
                                        <MDBIcon fas="true" icon="tag" />{tag}
                                    </MDBBadge>
                                </div>)
                            }
                        </div>
                        <MDBNavLink to={"/collection/"+ _id}><MDBBtn color="light">Details</MDBBtn></MDBNavLink>                    
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
            </ReactCardFlip>
        </div>
    )
}

function mapStateToProps(reduxState){
    return {
        modal: reduxState.modal      
    }
}

export default connect(mapStateToProps)(Card)