import React, {useState} from 'react'
import { connect } from 'react-redux';
import ReactCardFlip from 'react-card-flip';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBNavLink, MDBBadge, MDBView } from 'mdbreact';
import { newNotification, toggleModal } from '../actioncreators'
import api from '../api';
import './Card.css'

const Card = function (props) {
    let [isFlipped, setIsFlipped] = useState(false);
    let {title, titlePic, description, _id} = props.collection;
    let {dispatch} = props;
    
    let handleDelete = () => {
        api.deleteCollection(_id)
        .then(result => {
            dispatch(newNotification(
                (result.success) 
                ? `Your Collection '${title}' has been deleted`
                : `Sorry, your Collection could not be deleted.`
                , 'Deleted'
            ))
            api.getCollections()
                .then(collections => {
                    dispatch({
                        type: "GET_DATA", 
                        collections
                    })
                }).catch (err => console.log(err))
        })
        .catch(err => dispatch(newNotification(err.toString())));
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
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <MDBCol key="front" onClick={handleClick}>
            <MDBCard style={{ width: "18rem", height: "30rem" }}>
                <MDBView hover zoom>
                    <MDBCardImage className="img-fluid" src={titlePic} waves />
                </MDBView>
                    
                <MDBCardBody>
                    <MDBCardTitle><p className="title">{title}</p>
                        {api.isLoggedIn() && <MDBBadge onClick={handleDelete} color="danger"><i className="fas fa-trash-alt"></i>Delete</MDBBadge>}
                        {api.isLoggedIn() && <MDBBadge onClick={handleEdit} color="blue"><i className="fas fa-edit"></i>Edit</MDBBadge>}
                    </MDBCardTitle>
                    <MDBNavLink to={"/collection/"+ _id}><MDBBtn>Details</MDBBtn></MDBNavLink>
                </MDBCardBody>
            </MDBCard>
        </MDBCol>

        <MDBCol key="back" onClick={handleClick}>
            <MDBCard style={{ width: "18rem", height: "30rem" }}>
                <MDBCardBody>
                    <MDBCardTitle>{title}</MDBCardTitle>
                    <MDBCardText>
                        {description}
                    </MDBCardText>
                    <MDBNavLink to={"/collection/"+ _id}><MDBBtn>Details</MDBBtn></MDBNavLink>                    
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
        </ReactCardFlip>
    )
}

function mapStateToProps(reduxState){
    return {
      collections: reduxState.collections,
      notifications: reduxState.notifications,
      modal: reduxState.modal
    }
}

export default connect(mapStateToProps)(Card)

// export default Card