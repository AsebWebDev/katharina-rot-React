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

    let handleEdit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle()
    }

    let toggle = () => { dispatch(toggleModal(props.modal, _id)) }

    return (
        <div id="card">
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <MDBCol key="front" onClick={handleClick}>
                <MDBCard style={{ width: "15rem", height: "26rem" }}>
                    <MDBView hover zoom>
                        <MDBCardImage className="img-fluid" src={titlePic} waves />
                    </MDBView>
                    <MDBCardBody>
                        <MDBCardTitle>
                            <Heart target={{type: "Collection", targetId: _id, likes: likedSessions.length}} />
                            <div style={{ fontSize: calcFont(title.length) }} className="title">{title}</div>
                            <div className="card-buttons">
                                {api.isLoggedIn() && <MDBBadge onClick={handleDelete} color="danger"><i className="fas fa-trash-alt"></i>Delete</MDBBadge>}
                                {api.isLoggedIn() && <MDBBadge onClick={handleEdit} color="blue"><i className="fas fa-edit"></i>Edit</MDBBadge>}
                            </div>
                        </MDBCardTitle>
                        <MDBNavLink to={"/collection/"+ _id}><MDBBtn>Details</MDBBtn></MDBNavLink>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>

            <MDBCol key="back" onClick={handleClick}>
                <MDBCard style={{ width: "15rem", height: "26rem" }}>
                    <MDBCardBody>
                        <MDBCardTitle>
                            <Heart target={{type: "Collection", targetId: _id, likes: likedSessions.length}} />
                            {title}
                        </MDBCardTitle>
                        <MDBCardText>
                            {description}
                        </MDBCardText>
                        <div className="tags">
                            {tags.map((tag,i) => <MDBBadge key={i} color="light-green accent-4" ><MDBIcon fas="true" icon="tag" />{tag}</MDBBadge>)}
                        </div>
                        <MDBNavLink to={"/collection/"+ _id}><MDBBtn>Details</MDBBtn></MDBNavLink>                    
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
            </ReactCardFlip>
        </div>
    )
}

export default connect()(Card)